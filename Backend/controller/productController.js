const productsModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const { validationResult } = require("express-validator");
const productService = require("../services/productService");
const orderService = require("../services/orderService");
const paginate = require("../utils/pagination");

module.exports.newProductController = async (req, res) => {
  try {
    // #swagger.tags = ['Products']
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.produces = ['application/json']
    /* 
  #swagger.parameters['products'] = {
    in: 'formData',
    name: 'products',
    type: 'array',
    items: {
      type: 'file',
    },
    collectionFormat: 'multi',
    required: true,
    description: 'Upload up to 5 product images',
  }

  #swagger.parameters['productname'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Enter product name'
  }

  #swagger.parameters['price'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Enter product price'
  }

  #swagger.parameters['quantity'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Enter product quantity'
  }

  #swagger.parameters['category'] = {
    in: 'formData',
    type: 'string',
    required: false,
    description: 'Enter product category (optional)'
  }
*/

    const { productname, price, quantity, category } = req.body;
    const refid = req.params.id;

    const existedProduct = await productsModel.findOne({ refid, productname });
    if (existedProduct) {
      return res.status(400).json({ message: "product is allready exist" });
    }

    const productimages = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    const product = await productService.productCreate({
      productname,
      price: parseInt(price),
      productimages,
      quantity: parseInt(quantity),
      refid,
      category,
    });

    res.status(200).json({ product, message: "product is created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateProductController = async (req, res) => {
  try {
    // #swagger.tags = ['Products']
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.produces = ['application/json']
    /* 
  #swagger.parameters['products'] = {
    in: 'formData',
    name: 'products',
    type: 'array',
    items: {
      type: 'file',
    },
    collectionFormat: 'multi',
    required: true,
    description: 'Upload up to 5 product images',
  }

  #swagger.parameters['productname'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Enter product name'
  }

  #swagger.parameters['price'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Enter product price'
  }

  #swagger.parameters['quantity'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Enter product quantity'
  }

  #swagger.parameters['category'] = {
    in: 'formData',
    type: 'string',
    required: false,
    description: 'Enter product category (optional)'
  }
*/

    const { productname, price, quantity, category } = req.body;
    const refid = req.params.id;
    const name = req.params.name;

    const productimages = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    const existedProduct = await productsModel
      .findOne({ refid, productname: name })
      .populate("refid");

    if (!existedProduct) {
      return res.status(400).json({ message: "product is not exists" });
    }

    existedProduct.productname = productname;
    existedProduct.price = price;
    existedProduct.productimages = productimages;
    existedProduct.quantity = quantity;
    existedProduct.category = category;

    existedProduct.save();

    res.status(200).json({ message: "product is updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.deleteProductController = async (req, res) => {
  // #swagger.tags = ['Products']
  const refid = req.params.id;
  const name = req.params.name;

  try {
    const existedProduct = await productsModel
      .findOne({ refid, productname: name })
      .populate("refid");
    if (!existedProduct) {
      return res.status(400).json({ message: "product is not exists" });
    }

    await existedProduct.deleteOne();
    res.status(200).json({ message: "product is deleted successfully " });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

module.exports.fetchProductController = async (req, res) => {
  // #swagger.tags = ['Products']

  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    let searchTerm = req.query.searchTerm;

    let sort = {};
    if (req.query.sortfield && req.query.sortBy) {
      const field = req.query.sortfield;
      const sortorder = req.query.sortBy === "asc" ? 1 : -1;
      sort[field] = sortorder;
    }

    const pagination = await paginate(page, limit, searchTerm, sort);

    res.status(200).json({
      data: pagination.data,
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalCount: pagination.totalCount,
      message: "your search query is done",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "something went wrong", errors: error.message });
  }
};

module.exports.orderController = async (req, res) => {
  // #swagger.tags = ['Products']

  try {
    const { userid, productid, quantity } = req.body;
    const existedProduct = await productsModel
      .findById(productid)
      .populate("refid");

    if (!existedProduct && existedProduct.quantity > 0) {
      return res.status(400).json({ message: "Sorry product is out of stock at the moment" });
    }

    existedProduct.refid.order = productid;
    existedProduct.quantity -= 1;
    existedProduct.save();
    await existedProduct.refid.save();

    const price = existedProduct.price * quantity;

    const order = await orderService.orderCreate({
      userid,
      productid,
      quantity,
      totalamount: price,
    });
    order.save();

    res.status(200).json({ message: "your item is orderd", data: order });
  } catch (err) {
    res
      .status(400)
      .json({ message: "somthing went wrong", error: err.message });
  }
};
