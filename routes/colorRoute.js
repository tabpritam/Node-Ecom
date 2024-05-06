const express = require("express");
const router = express.Router();
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("../controller/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewate");

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);

module.exports = router;
