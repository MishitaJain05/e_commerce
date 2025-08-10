import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/get-product/${id}`
      );
      const p = data.product;
      setProduct(p);
      setName(p.name);
      setDescription(p.description);
      setPrice(p.price);
      setQuantity(p.quantity);
      setCategory(p.category._id);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching product");
    }
  };

  // Fetch categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/category/get-category`
      );
      if (data?.success) setCategories(data.category);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategories();
  }, []);

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("category", category);
      if (photo) formData.append("photo", photo);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/product/update-product/${id}`,
        formData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/admin/products");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating product");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            className="w-full border px-3 py-2"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            className="w-full border px-3 py-2"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              value={price}
              className="w-full border px-3 py-2"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              className="w-full border px-3 py-2"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Shipping</label>
          <select
            className="w-full border px-3 py-2"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <div className="mt-4">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="preview"
                className="h-48 rounded"
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_API}/product/product-photo/${
                  product._id
                }`}
                alt="old"
                className="h-48 rounded"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
