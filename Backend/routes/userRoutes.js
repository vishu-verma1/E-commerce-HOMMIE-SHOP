const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const authUser = require("../middleware/authUser");
const { body } = require("express-validator");
const { uploadImage } = require("../config/multerconfig");
const cacheMiddleware = require("../middleware/caching");

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("please enter valid password"),
  ],
  userController.signUpController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("please enter valid password"),
  ],
  userController.loginController
);

router.post(
  "/update",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
  ],
  authUser.isLogin,
  userController.updateController
);

router.get("/mail", authUser.isLogin, userController.sendMailController);
router.get(
  "/emailtoken/:token",
  authUser.isLogin,
  userController.emailTokenVerification
);

router.post("/verify", authUser.isLogin, userController.otpVerifyController);

router.get(
  "/profile",
  authUser.isLogin,
  userController.getUserProfileController
);

router.get("/logout", authUser.isLogin, userController.logoutController);

router.get(
  "/forgotpassword",
  authUser.isLogin,
  userController.forgotpassController
);

router.post(
  "/resetpassword",
  authUser.isLogin,
  userController.passwordResetController
);

router.post(
  "/updatepassword",
  authUser.isLogin,
  body("password")
    .isLength({ min: 6 })
    .withMessage("please enter valid password"),
  authUser.isLogin,
  userController.passwordUpdatetController
);

router.post("/address", authUser.isLogin, userController.addressController);
router.post("/addressupdate", authUser.isLogin, userController.updateAddressController);
router.get("/getaddress", authUser.isLogin, cacheMiddleware, userController.getAddressController);

router.post(
  "/profilepic",
  authUser.isLogin,
  uploadImage,
  userController.profilePicController
);

router.get(
  "/addtocart/:productid",
  authUser.isLogin,
  cacheMiddleware,
  userController.addToCartController
);

router.get(
  "/addtowishlist/:productid",
  authUser.isLogin,
  cacheMiddleware,
  userController.addToWishListController
);
router.get(
  "/getcartlist",
  authUser.isLogin,
  cacheMiddleware,
  userController.getCartListController
);

router.get(
  "/removecartlist/:productid",
  authUser.isLogin,
  // cacheMiddleware,
  userController.removeCartListController
);

router.get(
  "/getwishlist",
  authUser.isLogin,
  // cacheMiddleware,
  userController.getWishListController
);

router.get(
  "/removewishlist/:productid",
  authUser.isLogin,
  // cacheMiddleware,
  userController.removeWishListController
);

module.exports = router;
