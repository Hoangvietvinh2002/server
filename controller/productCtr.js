const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const slugify = require("slugify");
const { json } = require("body-parser");
const uploadCloudirary = require("../utils/cloudirary");
const fs = require("fs");

const createProduct = async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = productModel
    .create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateProduct = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  req.body.slug = slugify(req.body.title);
  const update = productModel
    .findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("sai o dau do");
    });
};

const deleteProduct = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const deletes = productModel
    .findOneAndDelete({ _id: id })
    .then((data) => {
      res.json("da xoa ");
    })
    .catch((err) => {
      console.log("sai o dau do");
    });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const find = productModel
    .findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("khong tim thay");
    });
};

const getAll = async (req, res) => {
  const queryObj = { ...req.query };
  
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = productModel.find(JSON.parse(queryStr));
  console.log(queryObj)

  if (req.query.sort) {
    console.log(req.query.sort);
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createAt");
  }

  if (req.query.fields) {
    console.log(req.query.fields);
    const fields = req.query.fields;
    console.log(fields);
    query = query.select(fields);
  } else {
    query.select("-__v");
  }

  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (page) {
    const productCount = await productModel.countDocuments();
    if (skip >= productCount) {
      return res.json("du lieu khong du de phan trang");
    }
  }

  const product = await query;
  res.json(product);
};
// const getUser = await productModel
//   .find()
//   .then((data) => {
//     res.json(data);
//   })
//   .catch((err) => {
//     console.log(err);
//     res.json("loi o dau do");
//   });

const addToWishlish = async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  const user = await userModel.findById({ _id });
  const alreadyadded = await user.wishlist.find(
    (id) => id.toString() === prodId.toString()
  );
  if (alreadyadded) {
    const deleteprodId = await userModel
      .findByIdAndUpdate(
        { _id },
        { $pull: { wishlist: prodId } },
        { new: true }
      )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json("loi o dau do");
      });
  } else {
    const addprodId = await userModel
      .findByIdAndUpdate(
        { _id },
        { $push: { wishlist: prodId } },
        { new: true }
      )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json("loi o dau do");
      });
  }
};

const rating = async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  const product = await productModel.findById({ _id: prodId });
  let alreadyRated = product.ratings.find(
    (id) => id.postedby.toString() === _id.toString()
  );
  if (alreadyRated) {
    const updateRating = await productModel
      .updateOne(
        { ratings: { $elemMatch: alreadyRated } },
        { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
        { new: true }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const rateProduct = await productModel.findByIdAndUpdate(
      { _id: prodId },
      { $push: { ratings: { star: star, postedby: _id, comment: ccomment } } },
      { new: true }
    );
    res.json(rateProduct);
  }
  const getallratings = await productModel.findById({ _id: prodId });
  let totalRating = getallratings.ratings.length;
  let ratingsum = getallratings.ratings
    .map((item) => item.star)
    .reduce((prev, curr) => prev + curr, 0);
  let actualRating = Math.round(ratingsum / totalRating);
  let finalproduct = await productModel.findByIdAndUpdate(
    { _id: prodId },
    { totalrating: actualRating },
    { new: true }
  );
  res.json(finalproduct);
};

const uploadImages = async (req, res) => {
  // console.log(req.params)
  const { id } = req.params;
  const urls = [];
  const uploader = (path) => uploadCloudirary(path);
  const files = req.files;
  for (const file of files) {
    const { path } = file;

    const fileUpload = await uploader(path);
    urls.push(fileUpload);
    fs.unlinkSync(path);
  }

  const findProduct = await productModel.findByIdAndUpdate(
    { _id: id },
    {
      images: urls.map((file) => {
        return file;
      }),
    },
    { new: true }
  );

  res.json(findProduct);
};
module.exports = {
  createProduct,
  getProduct,
  getAll,
  updateProduct,
  deleteProduct,
  addToWishlish,
  rating,
  uploadImages,
};
