const BCategory = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

//create a blog category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await BCategory.create(req.body);
    res.json({
      newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update a blog category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await BCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      updatedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//delete blog category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await BCategory.findByIdAndDelete(id);
    res.json({
      deletedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//fetch a blog category
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await BCategory.findById(id);
    res.json({
      getaCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//fetch all blog category
const getallCategory = asyncHandler(async (req, res) => {
  console.log("getallCategory");
  try {
    const getallCategory = await BCategory.find();
    res.json({
      getallCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
