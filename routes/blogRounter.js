const express = require("express");
const { isAdmin, authMidleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImage");
const Router = express.Router();

const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadBlog,
} = require("../controller/blogCtr");

Router.get("/getBlog/:id", getBlog);
Router.get("/getAllBlog", getAllBlog);
Router.get("/deleteBlog", deleteBlog);

Router.post("/createBlog", authMidleware, isAdmin, createBlog);
Router.post(
  "/upload/:id",
  authMidleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImgResize,
  uploadBlog
);
Router.post("/updateBlog/:id", authMidleware, isAdmin, updateBlog);
Router.post("/likes", authMidleware, isAdmin, likeBlog);
Router.post("/dislikes", authMidleware, isAdmin, dislikeBlog);

module.exports = Router;
