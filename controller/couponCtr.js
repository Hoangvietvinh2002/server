const couponModel = require("../models/couponModel");

const validateMongoDbId = require("../utils/validateMongoDbId");

const createCoupon = async (req, res) => {
  const newCoupon = await couponModel
    .create(req.body)
    .then((data) => {
      res.json({ stacode: 200, coupon: data });
    })
    .catch((err) => {
      console.log(err);
      res.json("loi khong tao duoc blog");
    });
};

const getCoupon = async (req, res) => {
  const { id } = req.params;
  const getCoupon = await couponModel
    .findById({ _id: id })
    .then((data) => {
      res.json({ stacode: 200, coupon: data });
    })
    .catch((err) => {
      console.log(err);
      res.json("loi khong tao duoc blog");
    });
};

const getallCoupon = async (req, res) => {
  const getallCoupon = await couponModel
    .find()
    .then((data) => {
      res.json({ stacode: 200, coupon: data });
    })
    .catch((err) => {
      console.log(err);
      res.json("loi khong tao duoc blog");
    });
};

const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const updateCoupon = await couponModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((data) => {
      res.json({ stacode: 200, coupon: data });
    })
    .catch((err) => {
      console.log(err);
      res.json("loi khong tao duoc blog");
    });
};

const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  const deleteCoupon = await couponModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({ stacode: 200, coupon: data });
    })
    .catch((err) => {
      console.log(err);
      res.json("loi khong tao duoc blog");
    });
};

module.exports = {
  createCoupon,
  getCoupon,
  getallCoupon,
  updateCoupon,
  deleteCoupon,
};
