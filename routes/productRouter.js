const express = require("express");
const {
  createProduct,
  getProduct,
  getAll,
  updateProduct,
  deleteProduct,
  addToWishlish,
  rating,
  uploadImages,
} = require("../controller/productCtr");
const { isAdmin, authMidleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const Router = express.Router();

Router.post(
  "/upload/:id",
  authMidleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
Router.post("/", createProduct);
Router.get("/getProduct/:id", authMidleware, isAdmin, getProduct);
Router.get("/all", getAll);
Router.put("/update/:id", authMidleware, isAdmin, updateProduct);
Router.put("/delete/:id", authMidleware, isAdmin, deleteProduct);
Router.post("/addwishlist", authMidleware, isAdmin, addToWishlish);
Router.post("/ratings", authMidleware, isAdmin, rating);

module.exports = Router;
