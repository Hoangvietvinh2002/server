const brandModel = require("../models/brandModel");

const createBrand = async (req, res) => {
  const newBrand = await brandModel.create(req.body);
  res.json(newBrand);
};

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const updateBrand = await brandModel.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  res.json(updateBrand);
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;
  const deleteBrand = await brandModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json("da xoa thanh cong");
    })
    .catch((error) => {
      res.json("khong xoa duoc");
    });
};

const getBrand = async (req, res) => {
  const { id } = req.params;
  const getBrand = await brandModel.findById({ _id: id });
  res.json(getBrand);
};

const getallBrand = async (req, res) => {
  const allBrand = await brandModel.find();
  res.json(allBrand);
};
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
};
