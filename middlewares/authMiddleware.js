const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandle = require("express-async-handler");

const authMidleware = asyncHandle(async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, "hvv");
        const user = await Users.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("khong co token");
    }
  } else {
    throw new Error("khong co phan header");
  }
});

async function isAdmin(req, res, next) {
  const { email } = req.user;
  try {
    const find = await Users.findOne({ email: email });
    if (find.role === "admin") {
      next();
    } else {
      return res.json("loi");
    }
  } catch (error) {
    console.error(error);
    return res.json("loi");
  }
}

module.exports = { authMidleware, isAdmin };
