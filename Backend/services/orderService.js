const orderModel = require("../models/orderModel");

module.exports.orderCreate = async ({userid, productid, quantity, orderdate, totalamount, status, }) => {
  if (!userid || !productid || !totalamount || !quantity) {
    throw new Error("All field are required");
  }

  const order = await orderModel.create({
    userid,
    productid,
    quantity,
    orderdate,
    totalamount,
    status,
  });

  return order;
};
