# API Documentation

## User Routes

### Sign Up
- **URL:** `/user/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password (minimum 6 characters).
- **Responses:**
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: Invalid input data.

### Login
- **URL:** `/user/login`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Request Body:**
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password (minimum 6 characters).
- **Responses:**
  - `200 OK`: User successfully logged in.
  - `401 Unauthorized`: Invalid email or password.

### Send Mail
- **URL:** `/user/mail`
- **Method:** `GET`
- **Description:** Send an email to the logged-in user.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **Responses:**
  - `200 OK`: Email sent successfully.
  - `401 Unauthorized`: Invalid or missing token.

### Email Token Verification
- **URL:** `/user/emailtoken/:token`
- **Method:** `GET`
- **Description:** Verify email token.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **URL Params:**
  - `token` (string, required): Email token.
- **Responses:**
  - `200 OK`: Token verified successfully.
  - `400 Bad Request`: Invalid token.
  - `401 Unauthorized`: Invalid or missing token.

### OTP Verification
- **URL:** `/user/verify`
- **Method:** `POST`
- **Description:** Verify OTP.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **Responses:**
  - `200 OK`: OTP verified successfully.
  - `400 Bad Request`: Invalid OTP.
  - `401 Unauthorized`: Invalid or missing token.

### Forgot Password
- **URL:** `/user/forgotpassword`
- **Method:** `GET`
- **Description:** Send OTP for password reset.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **Responses:**
  - `200 OK`: OTP sent successfully.
  - `401 Unauthorized`: Invalid or missing token.

### Reset Password
- **URL:** `/user/resetpassword`
- **Method:** `POST`
- **Description:** Reset user password.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **Responses:**
  - `200 OK`: Password reset successfully.
  - `400 Bad Request`: Invalid input data.
  - `401 Unauthorized`: Invalid or missing token.

### Update Password
- **URL:** `/user/updatepassword`
- **Method:** `POST`
- **Description:** Update user password.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **Request Body:**
  - `password` (string, required): New password (minimum 6 characters).
- **Responses:**
  - `200 OK`: Password updated successfully.
  - `400 Bad Request`: Invalid input data.
  - `401 Unauthorized`: Invalid or missing token.

### Address
- **URL:** `/user/address`
- **Method:** `POST`
- **Description:** Add or update user address.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **Responses:**
  - `200 OK`: Address added/updated successfully.
  - `400 Bad Request`: Invalid input data.
  - `401 Unauthorized`: Invalid or missing token.

### Profile Picture
- **URL:** `/user/profilepic`
- **Method:** `POST`
- **Description:** Upload user profile picture.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **Form Data:**
  - `file` (file, required): Profile picture file.
- **Responses:**
  - `200 OK`: Profile picture uploaded successfully.
  - `400 Bad Request`: Invalid file format.
  - `401 Unauthorized`: Invalid or missing token.

### Add to Cart
- **URL:** `/user/addtocart/:productid`
- **Method:** `GET`
- **Description:** Add product to cart.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **URL Params:**
  - `productid` (string, required): Product ID.
- **Responses:**
  - `200 OK`: Product added to cart successfully.
  - `400 Bad Request`: Invalid product ID.
  - `401 Unauthorized`: Invalid or missing token.

### Add to Wishlist
- **URL:** `/user/addtowishlist/:productid`
- **Method:** `GET`
- **Description:** Add product to wishlist.
- **Headers:**
  - `Authorization` (string, required): Bearer token.
- **URL Params:**
  - `productid` (string, required): Product ID.
- **Responses:**
  - `200 OK`: Product added to wishlist successfully.
  - `400 Bad Request`: Invalid product ID.
  - `401 Unauthorized`: Invalid or missing token.

## Product Routes

### Get All Products
- **URL:** `/products`
- **Method:** `GET`
- **Description:** Get all products.
- **Responses:**
  - `200 OK`: Products retrieved successfully.

### Get Product by ID
- **URL:** `/products/:id`
- **Method:** `GET`
- **Description:** Get product by ID.
- **URL Params:**
  - `id` (string, required): Product ID.
- **Responses:**
  - `200 OK`: Product retrieved successfully.
  - `400 Bad Request`: Invalid product ID.

### Create Product
- **URL:** `/products`
- **Method:** `POST`
- **Description:** Create a new product.
- **Request Body:**
  - `productname` (string, required): Product name.
  - `price` (number, required): Product price.
  - `quantity` (number, required): Product quantity.
  - `category` (string, required): Product category.
- **Responses:**
  - `201 Created`: Product created successfully.
  - `400 Bad Request`: Invalid input data.

### Update Product
- **URL:** `/products/:id`
- **Method:** `PUT`
- **Description:** Update product by ID.
- **URL Params:**
  - `id` (string, required): Product ID.
- **Request Body:**
  - `productname` (string, optional): Product name.
  - `price` (number, optional): Product price.
  - `quantity` (number, optional): Product quantity.
  - `category` (string, optional): Product category.
- **Responses:**
  - `200 OK`: Product updated successfully.
  - `400 Bad Request`: Invalid input data or product ID.

### Delete Product
- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Description:** Delete product by ID.
- **URL Params:**
  - `id` (string, required): Product ID.
- **Responses:**
  - `200 OK`: Product deleted successfully.
  - `400 Bad Request`: Invalid product ID.
  - `404 Not Found`: Product not found.