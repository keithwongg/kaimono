import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    let newProduct = {
      name: form.name,
      price: parseFloat(form.price).toFixed(2),
      quantity: parseInt(form.quantity),
    };

    await fetch(`${process.env.REACT_APP_HEROKU_URI}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", price: "", quantity: "" });
    navigate("/");
  }

  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={parseFloat(form.price)}
            onChange={(e) => updateForm({ price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={parseInt(form.quantity)}
            onChange={(e) => updateForm({ quantity: e.target.value })}
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
