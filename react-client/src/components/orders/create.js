import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Multiselect from "multiselect-react-dropdown";

export default function Create() {
  const [form, setForm] = useState({
    order_description: "",
    billing_address: "",
    shipping_address: "",
    payment_method: "",
    products: "",
    payment_total: "",
    status: "",
  });
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        `${process.env.REACT_APP_HEROKU_URI}/products/`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const products_json = await response.json();
      const products = products_json.map((product) => {
        return {
          id: product._id,
          name: product.name,
        };
      }).flat();
      setProducts(products);
    }

    getProducts();

    return;
  }, [products.length]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    let newOrders = {
      ...form,
    };

    await fetch(`${process.env.REACT_APP_HEROKU_URI}/orders/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrders),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      order_description: "",
      billing_address: "",
      shipping_address: "",
      payment_method: "",
      products: "",
      payment_total: "",
      status: "",
    });
    navigate("/orders");
  }

  function onMultiSelect(e) {
    updateForm({products: e});
    console.log(form.products, "added products");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="order-container">
      <h3>Create New Order</h3>
      <form className="form-container" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="order_description">Order Description</label>
          <input
            type="text"
            className="form-control"
            id="order_description"
            value={form.order_description}
            onChange={(e) => updateForm({ order_description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="billing_address">Billing Address</label>
          <input
            type="text"
            className="form-control"
            id="billing_address"
            value={form.billing_address}
            onChange={(e) => updateForm({ billing_address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipping_address">Shipping Address</label>
          <input
            type="text"
            className="form-control"
            id="shipping_address"
            value={form.shipping_address}
            onChange={(e) => updateForm({ shipping_address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment_method">Payment Method</label>
          <input
            type="text"
            className="form-control"
            id="payment_method"
            value={form.payment_method}
            onChange={(e) => updateForm({ payment_method: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="products">Products</label>
          <Multiselect
            options={products}
            onRemove={(e) => onMultiSelect(e)}
            onSelect={(e) => onMultiSelect(e)}
            displayValue="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment_total">Payment Total</label>
          <input
            type="text"
            className="form-control"
            id="payment_total"
            value={form.payment_total}
            onChange={(e) => updateForm({ payment_total: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            value={form.status}
            onChange={(e) => updateForm({ status: e.target.value })}
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="submit"
            value="Create Product"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
