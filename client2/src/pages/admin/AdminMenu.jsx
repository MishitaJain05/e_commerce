import React from "react";

const AdminMenu = () => {
  return (
    <div className="w-52 min-h-screen bg-gray-100 p-5">
      <h3 className="text-lg font-semibold mb-4">Admin Menu</h3>
      <ul className="list-none p-0">
        <li className="my-4">
          <a
            href="/admin/create-product"
            className="no-underline text-gray-800 hover:text-blue-600"
          >
            Create Product
          </a>
        </li>
        <li className="my-4">
          <a
            href="/admin/create-category"
            className="no-underline text-gray-800 hover:text-blue-600"
          >
            Create Category
          </a>
        </li>
        <li className="my-4">
          <a
            href="/admin/users"
            className="no-underline text-gray-800 hover:text-blue-600"
          >
            Users
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
