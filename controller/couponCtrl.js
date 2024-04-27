const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

//create coupon
const createCoupon = asyncHandler(async (req, res) => {
  //   const { _id } = req.user;
  //   validateMongoDbId(_id);
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json({
      newCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//get coupon
const getAllCoupons = asyncHandler(async (req, res) => {
  //   const { _id } = req.user;
  //   validateMongoDbId(_id);
  try {
    const coupons = await Coupon.find({});
    res.json({
      coupons,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      updateCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//delete coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.json({
      deletedCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupon };
