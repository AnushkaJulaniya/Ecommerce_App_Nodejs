const express = require("express");

const { listProducts, createProducts } = require("../controllers/product.controller");
const authorizer = require("../middlewares/rbac");

const router = express.Router();

router.get("/list",listProducts);
router.post("/create",authorizer(["SELLER"]),createProducts);

module.exports = router;


