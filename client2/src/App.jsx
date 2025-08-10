import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/User/Dashboard";
import Private from "./components/Routes/Private";
import Admin from "./components/Routes/Admin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CreateCategory from "./pages/admin/CreateCategory.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import Products from "./pages/admin/Products.jsx";
import UpdateProduct from "./pages/admin/updateProduct.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />

              {/* <Route path="user" element={<Private />}> */}
              <Route path="user/dashboard" element={<Dashboard />} />
              {/* </Route> */}

              {/* <Route path="/admin" element={<Admin />}> */}
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
              <Route path="admin/create-product" element={<CreateProduct />} />

              <Route path="admin/products" element={<Products />} />
              <Route
                path="admin/update-product/:id"
                element={<UpdateProduct />}
              />
              {/* </Route> */}

              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
