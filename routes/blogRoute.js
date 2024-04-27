const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewate");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeTheBlog,
  dislikeTheBlog,
} = require("../controller/blogCtrl");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, isAdmin, likeTheBlog);
router.put("/dislikes", authMiddleware, isAdmin, dislikeTheBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
