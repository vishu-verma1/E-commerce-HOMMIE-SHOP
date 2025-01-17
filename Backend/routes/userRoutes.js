const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const authUser = require("../middleware/authUser");
const { body } = require("express-validator");
const upload = require("../config/multerconfig")


router.post("/signup",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("please enter valid password"),
  ],
  userController.signUpController
);

router.post("/login",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("please enter valid password"),
  ],
  userController.loginController
);

router.get("/mail", authUser.isLogin, userController.sendMailController);
router.get("/emailtoken/:token", authUser.isLogin , userController.emailTokenVerification )

router.post("/verify", authUser.isLogin, userController.otpVerifyController);

router.get("/forgotpassword",
  authUser.isLogin,
  userController.forgotpassController
);

router.post("/resetpassword",
  authUser.isLogin,
  userController.passwordResetController
);

router.post("/updatepassword",
  authUser.isLogin,
  body("password")
    .isLength({ min: 6 })
    .withMessage("please enter valid password"),
  authUser.isLogin,
  userController.passwordUpdatetController
);


router.post("/address", authUser.isLogin, userController.addressController);

router.post("/profilepic", upload ,authUser.isLogin, userController.profilePicController);

router.get("/addtocart/:productid", authUser.isLogin, userController.addToCartController);

router.get("/addtowishlist/:productid", authUser.isLogin, userController.addToWishListController );




module.exports = router;
