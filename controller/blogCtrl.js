const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

//create a blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update a blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ updateBlog });
  } catch (error) {
    throw new Error(error);
  }
});

//get a blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//get all blogs

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();
    res.json(getBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

//delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json({ deletedBlog });
  } catch (error) {
    throw new Error(error);
  }
});

//Like functionlity
const likeTheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  console.log(blogId);
  validateMongoDbId(blogId);

  //find the blog which you want to like
  const blog = await Blog.findById(blogId);
  //find lgged in user
  const loginUserId = req?.user?._id;
  //Find if the user has liked the blog
  const isLiked = blog?.likes?.includes(loginUserId);
  //find the user if the user disliked the blog

  const alreadyDisliked = blog?.dislikes?.includes(loginUserId);

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json({ blog });
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json({ blog });
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json({ blog });
  }
});

//dislike functionality
const dislikeTheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  console.log(blogId);
  validateMongoDbId(blogId);

  //find the blog which you want to like
  const blog = await Blog.findById(blogId);
  //find lgged in user
  const loginUserId = req?.user?._id;
  //Find if the user has liked the blog
  const isDisLiked = blog?.dislikes?.includes(loginUserId);
  //find the user if the user disliked the blog

  const alreadyLiked = blog?.likes?.includes(loginUserId);

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json({ blog });
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json({ blog });
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json({ blog });
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeTheBlog,
  dislikeTheBlog,
};
