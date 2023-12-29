const express = require("express");
const { authMidleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/categoryCtr");

const Router = express.Router();

Router.post("/create", authMidleware, isAdmin, createCategory);
Router.post("/update/:id", authMidleware, isAdmin, updateCategory);
Router.post("/delete/:id", authMidleware, isAdmin, deleteCategory);
Router.post("/getCategory", authMidleware, isAdmin, getCategory);
Router.get("/allCategory",  getallCategory);

module.exports = Router;
