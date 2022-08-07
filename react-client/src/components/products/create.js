import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   price: "",
   quantity: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newProduct = { ...form };
 
   await fetch(`${process.env.REACT_APP_HEROKU_URI}/products/add`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newProduct),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", price: "", quantity: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
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
           type="text"
           className="form-control"
           id="price"
           value={form.price}
           onChange={(e) => updateForm({ price: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="quantity">Quantity</label>
         <input
           type="text"
           className="form-control"
           id="quantity"
           value={form.quantity}
           onChange={(e) => updateForm({ quantity: e.target.value })}
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
