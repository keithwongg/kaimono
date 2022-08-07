import React from "react";

import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/navbar";
import ProductsList from "./components/products/productList";
import ProductsEdit from "./components/products/edit";
import ProductsCreate from "./components/products/create";
import OrdersEdit from "./components/orders/edit";
import OrdersCreate from "./components/orders/create";
import OrdersList from "./components/orders/orderList";
import OrdersShow from "./components/orders/show";

const App = () => {
  return (
    <div className="overall-margin">
      <Navbar />
      <div className="overall-spacing">
        <p>Kaimono is a product and order management system</p>
        <div className="mb-4">
          <Link className="btn mt-2 me-2 product-list" to="/">
            Products List
          </Link>
          <Link className="btn mt-2 me-2 create-product" to="/products/create">
            Create Product
          </Link>
          <Link className="btn mt-2 me-2 order-list" to="/orders">
            Orders List
          </Link>
          <Link className="btn mt-2 me-2 create-order" to="/orders/create">
            Create Order
          </Link>
        </div>
        <Routes>
          <Route exact path="/" element={<ProductsList />} />
          <Route path="/products/edit/:id" element={<ProductsEdit />} />
          <Route path="/products/create" element={<ProductsCreate />} />
          <Route path="/orders/edit/:id" element={<OrdersEdit />} />
          <Route path="/orders/create" element={<OrdersCreate />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/orders/:id" element={<OrdersShow />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
