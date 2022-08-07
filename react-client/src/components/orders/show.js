import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 
const OrderDetails = (props) => (
  <div>
    <h3>Order</h3>
    <p>{props.order.order_description}</p>
    <p>{props.order.billing_address}</p>
    <p>{props.order.shipping_address}</p>
    <p>{props.order.payment_method}</p>
    <p>{props.order.payment_total}</p>
    <p>{props.order.status}</p>
  </div>
);
 
export default function OrdersShow() {
 const [order, setOrder] = useState([]);
 
 const params = useParams();
 // This method fetches the orders from the database.
 useEffect(() => {
   async function getOrder() {
     const id = params.id.toString();
     const response = await fetch(`${process.env.REACT_APP_HEROKU_URI}/orders/${id}`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const order = await response.json();
     setOrder(order);
   }
 
   getOrder();
 
   return;
 }, [params.id]);
 

 return (
   <div>
    <OrderDetails
      order={order}
      key={order._id}
    />
   </div>
 );
}
