import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/category/get-categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row mt-6 w-full">
      <div className="md:w-1/5 w-full px-4 mb-6 md:mb-0">
        <h4 className="text-center font-semibold mb-4">Filter By Category</h4>
        <div className="flex flex-col gap-2">
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
              className="mb-1"
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        {/* price filter */}
        <h4 className="text-center font-semibold mt-8 mb-4">Filter By Price</h4>
        <div className="flex flex-col gap-2">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="flex flex-col mt-6">
          <button
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
      <div className="md:w-4/5 w-full px-4">
        <h1 className="text-center text-2xl font-bold mb-6">All Products</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {products?.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded shadow-md overflow-hidden w-72 flex flex-col"
            >
              <img
                src={`${import.meta.env.VITE_API}/product/product-photo/${
                  p._id
                }`}
                className="h-48 w-full object-cover"
                alt={p.name}
              />
              <div className="p-4 flex flex-col flex-1">
                <h5 className="font-semibold text-lg mb-2">{p.name}</h5>
                <p className="text-gray-600 text-sm mb-2">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="text-blue-700 font-bold mb-4">$ {p.price}</p>
                <div className="flex gap-2 mt-auto">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                    More Details
                  </button>
                  <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          {products && products.length < total && (
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "Loadmore"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
