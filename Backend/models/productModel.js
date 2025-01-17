const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema({

//     filename: { type: String,  },

//     imageData: { type: Buffer,  },

//     contentType: { type: String,  }
// });

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
      min: [3, "product name should be at least 3 character long"],
      uppercass: false,
    },

    price: {
      type: Number,
      required: true,
    },

    productimages: [
      {
        data: Buffer,
        contentType: String,
      },
    ],

    quantity: {
      type: Number,
      required: true,
    },

    refid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productsModel = mongoose.model("products", productSchema);

module.exports = productsModel;
