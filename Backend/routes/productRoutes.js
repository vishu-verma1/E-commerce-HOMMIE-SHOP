const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const authUser = require("../middleware/authUser");
const {body} = require("express-validator")
const {uploadProducts } = require("../config/multerconfig")


//Routes for admin
router.post("/newproduct/:id", uploadProducts, productController.newProductController);
router.post("/updateproduct/:id/:name", uploadProducts, productController.updateProductController);
router.get("/deleteproduct/:id/:name",  productController.deleteProductController);

//Routes for user
 router.get("/fetch-product",  productController.fetchProductController);
 router.post("/order", authUser.isLogin ,  productController.orderController);
 router.get("/orderlist", authUser.isLogin, productController.getOrderListControler)






module.exports = router;