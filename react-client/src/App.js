import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

// We import all the components we need in our app
import Navbar from "./components/navbar/navbar";
import ProductList from "./components/products/productList";
import Edit from "./components/products/edit";
import Create from "./components/products/create";

const App = () => {
  return (
    <div className="overall-margin">
      <Navbar />
      <div className="overall-spacing">
        <p>Kaimono is a product and order management system</p>
        <div>
          <Link className="btn mt-2 me-2 create-product" to="/create">
            Create Product
          </Link>
          <Link className="btn mt-2 me-2 create-order" to="/create">
            Create Order
          </Link>
          <Link className="btn mt-2 me-2 show-order" to="/create">
            Show Orders
          </Link>
        </div>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
