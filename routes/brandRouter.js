const express = require("express");
const { authMidleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("../controller/brandCtr");

const Router = express.Router();

Router.post("/create", authMidleware, isAdmin, createBrand);
Router.post("/update/:id", authMidleware, isAdmin, updateBrand);
Router.post("/delete/:id", authMidleware, isAdmin, deleteBrand);
Router.get("/getBrand", getBrand);
Router.get("/allBrand", getallBrand);

module.exports = Router;
