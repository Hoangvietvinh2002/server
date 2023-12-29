const express = require("express");
const Router = express.Router();
const { authMidleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createUser,
  login,
  getAll,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handRefeshToken,
  logout,
  updatePassword,
  forgotpasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAdress,
  userCart,
  getUserCart,
  emtyCart,
  applycoupon,
  createOrder,
  getOrder,
  updateOrderStatus,
} = require("../controller/authCtl");

Router.get("/token", handRefeshToken);
Router.get("/all", getAll);
Router.get("/getuser/:id", getUser);
Router.get("/logout", logout);
Router.get("/getWishList", authMidleware, getWishlist);
Router.get("/getCart", authMidleware, getUserCart);
Router.get("/getOrder", authMidleware, getOrder);

Router.post("/register", createUser);
Router.post("/updatePassword", authMidleware, updatePassword);
Router.post("/login", login);
Router.post("/loginAdmin", loginAdmin);
Router.post("/forgotPassword", forgotpasswordToken);
Router.post("/resetPassword/:token", resetPassword);
Router.post("/blockUser/:id", blockUser);
Router.post("/unblockUser/:id", unblockUser);
Router.post("/saveAdress", authMidleware, saveAdress);
Router.post("/cart", authMidleware, userCart);
Router.post("/applycoupon", authMidleware, applycoupon);
Router.post("/createOrder", authMidleware, createOrder);
Router.post(
  "/updateOderStatus/:id",
  authMidleware,
  isAdmin,
  updateOrderStatus
);

Router.delete("/:id", deleteUser);
Router.delete("/api/emtyCart", authMidleware, emtyCart);
Router.put("/:id", updateUser);

module.exports = Router;
