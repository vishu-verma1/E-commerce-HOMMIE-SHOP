const productModel = require("../models/productModel");

async function paginate(page, limit, searchParams, sort) {
  const skip = (page - 1) * limit;
  
  let query = {};
  if (searchParams.searchTerm) {
    query.productname = { $regex: searchParams.searchTerm, $options: "i" };
  }
  if (searchParams.category) {
    query.category = searchParams.category;
  }
  if (searchParams.minPrice) {
    query.price = { ...query.price, $gte: parseInt(searchParams.minPrice) };
  }
  if (searchParams.maxPrice) {
    query.price = { ...query.price, $lte: parseInt(searchParams.maxPrice) };
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
