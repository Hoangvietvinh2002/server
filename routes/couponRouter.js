const express = require("express");
const { isAdmin, authMidleware } = require("../middlewares/authMiddleware");
const {
  createCoupon,
  getCoupon,
  getallCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtr");
const Router = express.Router();

Router.post("/create", createCoupon);
Router.get("/get", getCoupon);
Router.get("/getall", getallCoupon);
Router.post("/update", updateCoupon);
Router.post("/delete", deleteCoupon);

module.exports = Router;
