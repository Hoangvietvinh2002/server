const blogcategoryModel = require("../models/blogCategory");

const createCategory = async (req, res) => {
  const newCategory = await blogcategoryModel.create(req.body);
  res.json(newCategory);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updateCategory = await blogcategoryModel.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  res.json(updateCategory);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deleteCategory = await blogcategoryModel
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
  const getCategory = await blogcategoryModel.findById({ _id: id });
  res.json(getCategory);
};

const getallCategory = async (req, res) => {
  const allCategory = await blogcategoryModel.find();
  res.json(allCategory);
};
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
