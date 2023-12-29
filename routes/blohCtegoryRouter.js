const express = require("express");
const { authMidleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/blogCtegoryCtr");

const Router = express.Router();

Router.post("/create", authMidleware, isAdmin, createCategory);
Router.post("/update/:id", authMidleware, isAdmin, updateCategory);
Router.post("/delete/:id", authMidleware, isAdmin, deleteCategory);
Router.post("/getblogCategory", authMidleware, isAdmin, getCategory);
Router.get("/allblogCategory",  getallCategory);

module.exports = Router;
