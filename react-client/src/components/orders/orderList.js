import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Order = (props) => (
 <tr>
   <td>{props.orders._id}</td>
   <td>{props.orders.order_description}</td>
   <td>{props.orders.payment_total}</td>
   <td>{props.orders.status}</td>
   <td>
     <Link className="btn btn-link" to={`/orders/${props.orders._id}`}>Show</Link> |
     <Link className="btn btn-link" to={`/orders/edit/${props.orders._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteOrder(props.orders._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function OrdersShow() {
 const [orders, setOrders] = useState([]);
 
 // This method fetches the orders from the database.
 useEffect(() => {
   async function getOrders() {
     const response = await fetch(`${process.env.REACT_APP_HEROKU_URI}/orders/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const orders = await response.json();
     setOrders(orders);
   }
 
   getOrders();
 
   return;
 }, [orders.length]);
 
 // This method will delete a record
 async function deleteOrder(id) {
   await fetch(`${process.env.REACT_APP_HEROKU_URI}/orders/delete/${id}`, {
     method: "DELETE"
   });
 
   const newProducts = orders.filter((el) => el._id !== id);
   setOrders(newProducts);
 }
 
 // This method will map out the orders on the table
 function orderList() {
   return orders.map((orders) => {
     return (
       <Order
         orders={orders}
         deleteOrder={() => deleteOrder(orders._id)}
         key={orders._id}
       />
     );
   });
 }
 
 // This following section will display the table with the orders of individuals.
 return (
   <div className="orders-table">
     <h3 className="mt-4">Orders</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Order Id</th>
           <th>Order Description</th>
           <th>Payment Total</th>
           <th>Status</th>
         </tr>
       </thead>
       <tbody>{orderList()}</tbody>
     </table>
   </div>
 );
}
