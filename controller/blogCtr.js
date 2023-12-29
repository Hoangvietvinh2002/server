const blogModel = require("../models/blogModel");
const userModel = require("../models/blogModel");

const validateMongoDbId = require("../utils/validateMongoDbId");
const uploadCloudirary = require("../utils/cloudirary");

const fs = require("fs");

const createBlog = async (req, res) => {
  const newBlog = await blogModel
    .create(req.body)
    .then((data) => {
      res.json({ stacode: 200, blog: data });
    })
    .catch((err) => {
      console.log(err);
      res.json("loi khong tao duoc blog");
    });
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updateBlog = await blogModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((data) => {
      res.json({ status: 200, data: data });
    })
    .catch((err) => {
      res.json("khong update duoc blog");
    });
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const getBlog = await blogModel.findById({ _id: id }).populate("likes");
  const updateBlog = await blogModel.findByIdAndUpdate(
    { _id: id },
    { $inc: { numViews: 1 } },
    { new: true }
  );
  res.json(getBlog);
};

const getAllBlog = async (req, res) => {
  const getAllBlog = await blogModel
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("khong tim thay");
    });
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const getAllBlog = await blogModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json("ban da xoa thanh cong");
    })
    .catch((err) => {
      res.json("khong tim thay");
    });
};

const likeBlog = async (req, res) => {
  const { blogId } = req.body;
  const blog = await blogModel.findById({ _id: blogId });
  const loginUserId = req.user._id;
  const isLiked = blog.isLiked;
  console.log(isLiked);
  const alreadyDisliked = blog.dislikes.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  console.log(alreadyDisliked);
  if (alreadyDisliked) {
    const blog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $pull: { dislikes: loginUserId }, isDislike: false },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $pull: { likes: loginUserId }, isLiked: false },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $push: { likes: loginUserId }, isLiked: true },
      { new: true }
    );
    res.json(blog);
  }
};

const dislikeBlog = async (req, res) => {
  const { blogId } = req.body;
  const blog = await blogModel.findById({ _id: blogId });
  const loginUserId = req.user._id;
  const isDisliked = blog.isDislike;
  const alreadyLiked = blog.likes.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  console.log(isDisliked);
  if (alreadyLiked) {
    const blog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $pull: { likes: loginUserId }, isLiked: false },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisliked) {
    const blog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $pull: { dislikes: loginUserId }, isDislike: false },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { $push: { dislikes: loginUserId }, isDislike: true },
      { new: true }
    );
    res.json(blog);
  }
};

const uploadBlog = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const urls = [];
  const uploader = (path) => uploadCloudirary(path);
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    console.log(path);

    const fileUpload = await uploader(path);
    urls.push(fileUpload);
    fs.unlinkSync(path);
  }
  const findBlog = await blogModel.findByIdAndUpdate(
    { _id: id },
    {
      images: urls.map((file) => {
        return file;
      }),
    },
    { new: true }
  );

  res.json(findBlog);
};
module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadBlog,
};
