import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CreateCategory = () => {
  const [categories, setCategories] = React.useState([]);

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
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">#</th>
              <th className="py-2 px-4 border-b text-left">Category Name</th>
              <th className="py-2 px-4 border-b text-left">Edit</th>
              <th className="py-2 px-4 border-b text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={cat._id || idx} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{idx + 1}</td>
                <td className="py-2 px-4 border-b">{cat.name}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-white bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded">
                    Edit
                  </button>
                </td>
                <td>
                  <button className="text-white bg-red-500 hover:bg-red-400 px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td className="py-2 px-4 border-b"></td>
              <td className="py-2 px-4 border-b">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="categoryName"
                    placeholder="New category"
                    className="border px-2 py-1 rounded mr-2"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>
                </form>
              </td>
              <td className="py-2 px-4 border-b"></td>
              <td className="py-2 px-4 border-b"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateCategory;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/authContext.jsx";

// const CreateCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [auth] = useAuth();

//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API}/category/get-categories`
//       );
//       if (data.success) {
//         setCategories(data.categories);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.elements.categoryName.value.trim();
//     if (!name) {
//       toast.error("Category name is required");
//       return;
//     }
//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API}/category/create-category`,
//         { name },
//         {
//           headers: {
//             Authorization: `${auth?.token}`,
//           },
//         }
//       );

//       if (data.success) {
//         toast.success("Category created");
//         form.reset();
//         fetchCategories();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(
//         "Create category error:",
//         error.response?.data || error.message
//       );
//       toast.error("Failed to create category");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Categories</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border-b text-left">#</th>
//               <th className="py-2 px-4 border-b text-left">Category Name</th>
//               <th className="py-2 px-4 border-b text-left">Edit</th>
//               <th className="py-2 px-4 border-b text-left">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((cat, idx) => (
//               <tr key={cat._id || idx} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{idx + 1}</td>
//                 <td className="py-2 px-4 border-b">{cat.name}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button className="text-white bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded">
//                     Edit
//                   </button>
//                 </td>
//                 <td>
//                   <button className="text-white bg-red-500 hover:bg-red-400 px-2 py-1 rounded">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             <tr>
//               <td className="py-2 px-4 border-b"></td>
//               <td className="py-2 px-4 border-b">
//                 <form onSubmit={handleSubmit}>
//                   <input
//                     type="text"
//                     name="categoryName"
//                     placeholder="New category"
//                     className="border px-2 py-1 rounded mr-2"
//                   />
//                   <button
//                     type="submit"
//                     className="bg-green-500 text-white px-2 py-1 rounded"
//                   >
//                     Add
//                   </button>
//                 </form>
//               </td>
//               <td className="py-2 px-4 border-b"></td>
//               <td className="py-2 px-4 border-b"></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CreateCategory;
