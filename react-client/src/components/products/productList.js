import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './products.css';
 
const Product = (props) => (
 <tr>
   <td>{props.product.name}</td>
   <td>{props.product.price}</td>
   <td>{props.product.quantity}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.product._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteProduct(props.product._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function ProductList() {
 const [products, setProducts] = useState([]);
 
 // This method fetches the products from the database.
 useEffect(() => {
   async function getProducts() {
     const response = await fetch(`${process.env.REACT_APP_HEROKU_URI}/products/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const products = await response.json();
     setProducts(products);
   }
 
   getProducts();
 
   return;
 }, [products.length]);
 
 // This method will delete a record
 async function deleteProduct(id) {
   await fetch(`${process.env.REACT_APP_HEROKU_URI}/${id}`, {
     method: "DELETE"
   });
 
   const newProducts = products.filter((el) => el._id !== id);
   setProducts(newProducts);
 }
 
 // This method will map out the products on the table
 function productList() {
   return products.map((product) => {
     return (
       <Product
         product={product}
         deleteProduct={() => deleteProduct(product._id)}
         key={product._id}
       />
     );
   });
 }
 
 // This following section will display the table with the products of individuals.
 return (
   <div>
     <Link class="btn btn-primary mt-2" to="/create">Create Product</Link>
     <h3 className="mt-4">Product List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Price</th>
           <th>Quantity</th>
         </tr>
       </thead>
       <tbody>{productList()}</tbody>
     </table>
   </div>
 );
}
