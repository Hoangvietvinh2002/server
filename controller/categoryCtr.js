const categoryModel = require("../models/categoryModels");

const createCategory = async (req, res) => {
  const newCategory = await categoryModel.create(req.body);
  res.json(newCategory);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updateCategory = await categoryModel.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  res.json(updateCategory);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deleteCategory = await categoryModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json("da xoa thanh cong");
    })
    .catch((error) => {
      res.json("khong xoa duoc");
    });
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const getCategory = await categoryModel.findById({ _id: id });
  res.json(getCategory);
};

const getallCategory = async (req, res) => {
  const allCategory = await categoryModel.find();
  res.json(allCategory);
};
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
