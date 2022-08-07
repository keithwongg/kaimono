import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Multiselect from "multiselect-react-dropdown";
import './orders.css';
 
export default function Edit() {
 const [form, setForm] = useState({
    order_description: "",
    billing_address: "",
    shipping_address: "",
    payment_method: "",
    products: "",
    payment_total: "",
    status: "",
    orders: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${process.env.REACT_APP_HEROKU_URI}/orders/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText} ${process.env.REACT_APP_HEROKU_URI}`;
       window.alert(message);
       return;
     }
 
     const order = await response.json();
     if (!order) {
       window.alert(`Order with id ${id} not found`);
       navigate("/orders");
       return;
     }
 
     setForm(order);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedOrder = {
      ...form
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`${process.env.REACT_APP_HEROKU_URI}/orders/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedOrder),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/orders");
 }

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

  function onMultiSelect(e) {
    updateForm({products: e});
    console.log(form.products, "added products");
  }
 
 return (
   <div className="order-container">
     <h3>Update Order</h3>
      <form className="form-container" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="order_description">Order Description</label>
          <input
            type="text"
            className="form-control"
            id="order_description"
            value={form.order_description}
            onChange={(e) => updateForm({ order_description: e.target.value })}
            required="required"
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
            required="required"
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
            required="required"
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
            required="required"
          />
        </div>
        <div className="form-group">
          <label htmlFor="products">Products</label>
          <Multiselect
            options={products}
            onRemove={(e) => onMultiSelect(e)}
            onSelect={(e) => onMultiSelect(e)}
            displayValue="name"
            emptyRecordMsg="No products ordered"
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
            required="required"
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
            required="required"
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="submit"
            value="Update Order"
            className="btn btn-primary"
          />
        </div>
      </form>
   </div>
 );
}
