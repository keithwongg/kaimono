import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

// We import all the components we need in our app
import Navbar from "./components/navbar/navbar";
import ProductsList from "./components/products/productList";
import ProductsEdit from "./components/products/edit";
import ProductsCreate from "./components/products/create";
import OrdersCreate from "./components/orders/create";
import OrdersShow from "./components/orders/show";

const App = () => {
  return (
    <div className="overall-margin">
      <Navbar />
      <div className="overall-spacing">
        <p>Kaimono is a product and order management system</p>
        <div className="mb-4">
          <Link className="btn mt-2 me-2 create-product" to="/products/create">
            Create Product
          </Link>
          <Link className="btn mt-2 me-2 create-order" to="/orders/create">
            Create Order
          </Link>
          <Link className="btn mt-2 me-2 show-order" to="/orders/show">
            Show Orders
          </Link>
        </div>
        <Routes>
          <Route exact path="/" element={<ProductsList />} />
          <Route path="/products/edit/:id" element={<ProductsEdit />} />
          <Route path="/products/create" element={<ProductsCreate />} />
          <Route path="/orders/create" element={<OrdersCreate />} />
          <Route path="/orders/show" element={<OrdersShow />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
