import React from "react";

const CategoryForm = () => {
  const [name, setName] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <div className="mb-4">
        <label
          htmlFor="category-name"
          className="block text-gray-700 font-bold mb-2"
        >
          Category Name:
        </label>
        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Create Category
      </button>
    </form>
  );
};

export default CategoryForm;
