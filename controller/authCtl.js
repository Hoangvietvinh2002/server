const authModel = require("../models/userModel");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const couponModel = require("../models/couponModel");
const orderModel = require("../models/orderModel");

const generateToken = require("../config/jwtToken");
const refeshgenetaToken = require("../config/refeshtoken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const sendMail = require("./emailCtr");

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const createUser = async (req, res) => {
  const emails = req.body.email;
  // console.log(req.body.email);
  const findUser = await authModel.findOne({ email: emails });
  if (findUser) {
    res.json("tai khoan da ton tai");
  } else {
    const newUser = authModel.create(req.body);
    res.json("ban da tao tai khoan thanh cong");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userModel.findOne({ email: email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    refeshToken = await refeshgenetaToken(findUser?._id);
    console.log(refeshToken);
    update = await userModel.findByIdAndUpdate(
      findUser._id,
      { refeshTokenn: refeshToken },
      { new: true }
    );
    // console.log(update);
    res.cookie("refeshtoken", refeshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 100,
    });
    res.json({
      mgs: "ban da dang nhap thanh cong",
    });
  } else {
    res.json("khong tim thay tai khoan");
    // console.log(findUser, findUser.isPasswordMatched(password));
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userModel.findOne({ email: email });
  // console.log(findUser);
  // console.log(findUser._id);
  if (findUser.role !== "admin") {
    res.json("ban khong phai la admin");
  }
  if (findUser && (await findUser.isPasswordMatched(password))) {
    refeshToken = await refeshgenetaToken(findUser?._id);
    console.log(refeshToken);
    update = await userModel.findByIdAndUpdate(
      findUser._id,
      { refeshTokenn: refeshToken },
      { new: true }
    );
    // console.log(update);
    res.cookie("refeshtoken", refeshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 100,
    });
    res.json({
      mgs: "ban da dang nhap thanh cong",
    });
  } else {
    res.json("khong tim thay tai khoan");
    // console.log(findUser, findUser.isPasswordMatched(password));
  }
};

const handRefeshToken = async (req, res) => {
  const cookie = await req.headers.cookie;
  const newcookie = cookie.split("=");
  console.log(newcookie);
  if (!newcookie[1]) {
    res.json("khong co cookies");
  }
  //console.log(refeshToken)
  const user = await userModel.findOne({ refeshTokenn: newcookie[1] });
  console.log(user);
  if (!user) {
    res.json("sai mat khau");
  }
  const Token = jwt.verify(newcookie[1], "hvv");
  // console.log(newToken)
  const newToken = generateToken(user._id);
  res.json({ newToken });
};

const logout = async (req, res) => {
  const cookie = await req.headers.cookie;
  const newcookie = cookie.split("=");
  const token = newcookie[1];
  console.log(cookie);
  if (!cookie) {
    res.json("khong co cookies");
  }
  const user = await userModel.findOne({ refeshTokenn: token });
  if (!user) {
    res.clearCookie("refeshtoken"),
      {
        httpOnly: true,
        secure: true,
      };
    return res.sendStatus(204);
  }
  await userModel.findOneAndUpdate(
    { refeshTokenn: token },
    { refeshTokenn: "" }
  );
  res.clearCookie("refeshtoken", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json("ban da dang xuat ");
};

const saveAdress = async (req, res) => {
  const { _id } = req.user;
  const saveAdress = userModel
    .findByIdAndUpdate({ _id }, { address: req.body.adress }, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("khong update duoc ");
    });
};

const getAll = async (req, res) => {
  try {
    const getUser = await userModel.find();
    res.json(getUser);
  } catch (error) {
    res.json("khong lay duoc data");
  }
};

const getUser = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  // console.log(id);
  try {
    const getUser = await userModel.findById({ _id: id });
    if (!getUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.json({
      getUser,
    });
  } catch (error) {
    res.json("loi server");
  }
};

const deleteUser = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  try {
    const deleteUser = await userModel.findByIdAndDelete({ _id: id });
    res.json({
      msg: "ban da xoa thanh cong",
    });
  } catch (error) {
    res.json("loi server");
  }
};

const updateUser = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
      },
      { new: true }
    );
    res.json({
      msg: "ban da cap nhat thanh cong",
    });
  } catch (error) {
    res.json("loi server");
  }
};

const blockUser = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const block = await userModel.findByIdAndUpdate(
      { _id: id },
      { isBlock: true },
      { new: true }
    );
    res.json({ block });
  } catch (error) {
    res.json("loi server");
  }
};

const unblockUser = async (req, res) => {
  const id = req.params;
  try {
    const unblock = await userModel.findByIdAndUpdate(
      { _id: id },
      { isBlock: false },
      { new: true }
    );
    res.json({ unblock });
  } catch (error) {
    res.json("loi server");
  }
};

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  console.log({ password });
  validateMongoDbId(_id);
  console.log(validateMongoDbId(_id));
  const user = await userModel.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  }
};

const forgotpasswordToken = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    res.json("sai tia khoan");
  }
  try {
    const token = await user.createPasswordResetToken();

    await user.save();
    const resetURL = `hi <a href='http://localhost:5000/api/user/resetPassword/${token}'>an vao day </a>`;
    const data = {
      to: email,
      text: "hey you",
      subject: "link quen mk",
      html: resetURL,
    };
    sendMail(data);
    res.json(token);
  } catch (error) {
    res.json("loi server");
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordReserExpires: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    throw new Error("token het han");
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordReserExpires = undefined;
  await user.save();
  res.json(user);
};

const getWishlist = async (req, res) => {
  const { _id } = req.user;
  const findUser = await userModel
    .findById({ _id })
    .populate("wishlist")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("khong lay duoc wishlist");
    });
};

const userCart = async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;

  let products = [];
  const user = await userModel.findById(_id);
  const alreadyExistCart = await cartModel.findOne({ orderBy: user.id });
  if (alreadyExistCart) {
    alreadyExistCart.remove();
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    let getPrice = await productModel
      .findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = getPrice.price;

    products.push(object);
  }
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  const newCart = await new cartModel({
    product: products,
    cartTotal: cartTotal,
    orderBy: user._id,
  }).save();
  res.json(newCart);
};

const getUserCart = async (req, res) => {
  const { _id } = req.user;
  const findCart = await cartModel
    .findOne({ orderBy: _id })
    .populate("product.product")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const emtyCart = async (req, res) => {
  const { _id } = req.user;
  const user = await userModel.findById({ _id });
  const removeCart = await cartModel
    .findOneAndRemove({ orderBy: user._id })
    .then((data) => {
      console.log("da xoa thanh cong");
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

const applycoupon = async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  const validCoupon = await couponModel.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error();
  }
  const user = await userModel.findOne({ _id: _id });
  let { cartTotal } = await cartModel
    .findOne({ orderBy: user._id })
    .populate("product.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await cartModel.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
};

const createOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  if (!COD) {
    throw new Error("loi khong co COD");
  }
  const user = await userModel.findById(_id);
  let usercart = await cartModel.findOne({ orderBy: user._id });
  let finalAmout = 0;
  if (couponApplied && usercart.totalAfterDiscount) {
    finalAmout = usercart.totalAfterDiscount * 100;
  } else {
    finalAmout = usercart.cartTotal * 100;
  }
  let newOrder = await new orderModel({
    product: usercart.product,
    paymentIntent: {
      id: uniqid(),
      method: "COD",
      amount: finalAmout,
      status: "Cash on Delivery",
      created: Date.now(),
      currency: "usd",
    },
    orderBy: user._id,
    orderStatus: "Cash on Delivery",
  }).save();
  let update = await usercart.product.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  const updates = await productModel.bulkWrite(update, {});
  res.json({ message: "success" });
};

const getOrder = async (req, res) => {
  const { _id } = req.user;
  const getorder = await orderModel
    .findOne({ orderBy: _id })
    .populate("product.product")
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("loi khong lay duoc");
    });
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const update = orderModel
    .findByIdAndUpdate({ _id: id }, { orderStatus: status }, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("khong cap nhat duoc");
    });
};

module.exports = {
  createUser,
  login,
  getAll,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handRefeshToken,
  logout,
  updatePassword,
  forgotpasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAdress,
  userCart,
  getUserCart,
  emtyCart,
  applycoupon,
  createOrder,
  getOrder,
  updateOrderStatus,
};
