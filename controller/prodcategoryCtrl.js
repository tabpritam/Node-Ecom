const PCategory = require("../models/prodcategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

//create a category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await PCategory.create(req.body);
    res.json({
      newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update a category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await PCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      updatedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await PCategory.findByIdAndDelete(id);
    res.json({
      deletedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//fetch a category
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await PCategory.findById(id);
    res.json({
      getaCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//fetch all category
const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await PCategory.find();
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
