
const cartController  = require("../controllers/cart.controller");
const express = require("express");
const router = express.Router();

router.post("/add",cartController.addToCart);


// Todo : add / remove api

router.get("/", cartController.getCart);
module.exports = router;