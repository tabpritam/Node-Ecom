const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getalluser,
  getauser,
  deleteauser,
  updatedauser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCouon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewate");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCouon);
router.post("/cart/create-order", authMiddleware, createOrder);

router.get("/all-users", authMiddleware, isAdmin, getalluser);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/cart", authMiddleware, getUserCart);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/:id", authMiddleware, isAdmin, getauser);

router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteauser);

router.put("/edit-user", authMiddleware, updatedauser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
