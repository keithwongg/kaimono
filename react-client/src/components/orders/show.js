import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderDetails = (props) => (
  <div className="card card-container">
    <div className="card-header">
      <p>Id: {props.order._id}</p>
    </div>
    <div className="card-body">
      <h5 className="card-title">Order Description</h5>
      <p className="card-text">{props.order.order_description}</p>
      <h5 className="card-title">Billing Address</h5>
      <p className="card-text">{props.order.billing_address}</p>
      <h5 className="card-title">Shipping Address</h5>
      <p className="card-text">{props.order.shipping_address}</p>
      <h5 className="card-title">Payment Method</h5>
      <p className="card-text">{props.order.payment_method}</p>
      <h5 className="card-title">Products</h5>
        {props.order.products?.map((product, index) => {
          return (
            <p className="card-text" key={index}>{product.name}</p>
          );
        })}
      <h5 className="card-title">Payment Total</h5>
      <p className="card-text">{props.order.payment_total}</p>
      <h5 className="card-title">Status</h5>
      <p className="card-text">{props.order.status}</p>
      <Link className="btn btn-primary" to={`/orders/edit/${props.order._id}`}>Edit</Link>
    </div>
  </div>
);

export default function OrdersShow() {
  const [order, setOrder] = useState([]);

  const params = useParams();
  useEffect(() => {
    async function getOrder() {
      const id = params.id.toString();
      const response = await fetch(
        `${process.env.REACT_APP_HEROKU_URI}/orders/${id}`
      );

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
      <OrderDetails order={order} key={order._id} />
    </div>
  );
}
