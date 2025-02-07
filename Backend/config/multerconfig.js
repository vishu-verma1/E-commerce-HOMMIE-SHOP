const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const uploadpath = path.resolve(__dirname, "./..", "public/multimedia");

// Ensure the upload directory exists
if (!fs.existsSync(uploadpath)) {
  fs.mkdirSync(uploadpath, { recursive: true });
}

// Disk storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadpath);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, name) => {
      if (err) return cb(err); // Handle error properly
      let filename = name.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({ storage: storage });

// Memory storage for products
const memostorage = multer.memoryStorage();
const uploadproducts = multer({ storage: memostorage });

// Export both upload functions properly
module.exports = {
  uploadImage: upload.single("image"),
  uploadProducts: uploadproducts.array("products", 5),
};
