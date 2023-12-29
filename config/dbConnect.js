const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/test")
    .then((data) => {
      console.log("ket noi thanh cong");
    })
    .catch((err) => {
      console.log("ket noi that bai");
    });
};

module.exports = dbConnect;
