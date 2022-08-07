import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   price: "",
   quantity: "",
   products: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${process.env.REACT_APP_HEROKU_URI}/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText} ${process.env.REACT_APP_HEROKU_URI}`;
       window.alert(message);
       return;
     }
 
     const product = await response.json();
     if (!product) {
       window.alert(`Product with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(product);
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
   const editedProduct = {
     name: form.name,
     price: form.price,
     quantity: form.quantity,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`${process.env.REACT_APP_HEROKU_URI}/products/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedProduct),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="price">Price: </label>
         <input
           type="text"
           className="form-control"
           id="price"
           value={form.price}
           onChange={(e) => updateForm({ price: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="quantity">Quantity: </label>
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
           value="Update Product"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
