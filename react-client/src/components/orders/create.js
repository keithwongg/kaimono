import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    order_information: "",
    billing_address: "",
    shipping_address: "",
    payment_method: "",
    products: "",
    payment_total: "",
    status: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    let newOrders = {
      ...form
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
      order_information: "",
      billing_address: "",
      shipping_address: "",
      payment_method: "",
      products: "",
      payment_total: "",
      status: "",
    });
    navigate("/orders");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Order</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="order_information">Order Information</label>
          <input
            type="text"
            className="form-control"
            id="order_information"
            value={form.order_information}
            onChange={(e) => updateForm({ order_information: e.target.value })}
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
          <input
            type="text"
            className="form-control"
            id="products"
            value={form.products}
            onChange={(e) => updateForm({ products: e.target.value })}
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
        <div className="form-group">
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
