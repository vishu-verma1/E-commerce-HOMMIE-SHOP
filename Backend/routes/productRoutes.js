const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const authUser = require("../middleware/authUser");
const {body} = require("express-validator")
const uploadproducts = require("../config/multerconfig")


//Routes for admin
router.post("/newproduct/:id", uploadproducts, productController.newProductController);
router.post("/updateproduct/:id/:name", uploadproducts, productController.updateProductController);
router.get("/deleteproduct/:id/:name",  productController.deleteProductController);

//Routes for user
 router.get("/fetchProduct",  productController.fetchProductController);
 router.post("/order", authUser.isLogin ,  productController.orderController);

 





module.exports = router;