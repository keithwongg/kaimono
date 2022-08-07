const express = require("express");
 
// orderRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /orders.
const orderRoutes = express.Router();
 
// Connect to the database
const dbo = require("../db/conn");
 
// Convert id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
orderRoutes.route("/orders").get(function (req, res) {
 let db_connect = dbo.getDb("kaimono");
 db_connect
   .collection("orders")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
orderRoutes.route("/orders/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("orders")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
orderRoutes.route("/orders/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   order_description: req.body.order_description,
   billing_address: req.body.billing_address,
   shipping_address: req.body.shipping_address,
   payment_method: req.body.payment_method,
   products: req.body.products,
   payment_total: req.body.payment_total,
   status: req.body.status,
 };
 db_connect.collection("orders").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
orderRoutes.route("/orders/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    order_description: req.body.order_description,
    billing_address: req.body.billing_address,
    shipping_address: req.body.shipping_address,
    payment_method: req.body.payment_method,
    products: req.body.products,
    payment_total: req.body.payment_total,
    status: req.body.status,
   },
 };
 db_connect
   .collection("orders")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("order updated");
     response.json(res);
   });
});
 
orderRoutes.route("/orders/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("orders").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("order deleted");
   response.json(obj);
 });
});
 
module.exports = orderRoutes;
