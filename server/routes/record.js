const express = require("express");
 
// productRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /products.
const productRoutes = express.Router();
 
// Connect to the database
const dbo = require("../db/conn");
 
// Convert id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
productRoutes.route("/products").get(function (req, res) {
 let db_connect = dbo.getDb("kaimono");
 db_connect
   .collection("products")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
productRoutes.route("/products/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("products")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
productRoutes.route("/products/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   price: req.body.price,
   quantity: req.body.quantity,
 };
 db_connect.collection("products").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
productRoutes.route("/products/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     price: req.body.price,
     quantity: req.body.quantity,
   },
 };
 db_connect
   .collection("products")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 product updated");
     response.json(res);
   });
});
 
productRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("products").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 product deleted");
   response.json(obj);
 });
});
 
module.exports = productRoutes;
