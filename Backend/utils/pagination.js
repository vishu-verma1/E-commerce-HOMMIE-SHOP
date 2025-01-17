const productModel = require("../models/productModel");

async function paginate(page, limit, searchTerm, sort) {
  const skip = (page - 1) * limit;

  let query = {};
  if (searchTerm) {
    query = { productname: { $regex: searchTerm, $options: "i" } };
  }

  const data = await productModel
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const totalCount = await productModel.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    currentPage: page,
    totalPages,
    totalCount,
  };
}

module.exports = paginate;
