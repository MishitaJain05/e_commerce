import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/get-products`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row m-10">
      <div className="md:w-3/4">
        <h1 className="text-2xl font-bold text-center mb-6">
          All Products List
        </h1>
        <div className="flex flex-wrap gap-4">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/admin/update-product/${p._id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 hover:scale-105 transition-shadow duration-200">
                <img
                  src={`${import.meta.env.VITE_API}/product/product-photo/${
                    p._id
                  }`}
                  className="w-full h-60 object-cover"
                  alt={p.name}
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                  <p className="text-gray-600 text-sm">{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
