import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext.jsx";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/category/get-categories`
      );

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.categoryName.value.trim();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Category created");
        form.reset();
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
    }
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingName.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/category/update-category/${editingId}`,
        { name: editingName.trim() },
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Category updated");
        setEditingId(null);
        setEditingName("");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API}/category/delete-category/${id}`,
          {
            headers: {
              Authorization: `${auth?.token}`,
            },
          }
        );

        if (response?.data?.success) {
          toast.success("Category deleted successfully");
          fetchCategories();
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-center w-16">#</th>
                <th className="py-3 px-4 border-b text-center">
                  Category Name
                </th>
                <th className="py-3 px-4 border-b text-center w-56">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat._id || idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-center">{idx + 1}</td>
                  <td className="py-3 px-4 border-b text-center">
                    {editingId === cat._id ? (
                      <form
                        onSubmit={handleEditSubmit}
                        className="flex items-center justify-center gap-2"
                      >
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="border px-2 py-1 rounded w-40"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                          onClick={() => {
                            setEditingId(null);
                            setEditingName("");
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <span className="block">{cat.name}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded transition"
                        onClick={() => handleEdit(cat._id, cat.name)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition"
                        onClick={() => handleDelete(cat._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-3 px-4 border-b"></td>
                <td className="py-3 px-4 border-b text-center">
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center justify-center gap-2"
                  >
                    <input
                      type="text"
                      name="categoryName"
                      placeholder="New category"
                      className="border px-2 py-1 rounded w-40"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                    >
                      Add
                    </button>
                  </form>
                </td>
                <td className="py-3 px-4 border-b"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
