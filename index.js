const express = require("express");
const app = express();
const PORT = 5000;
const productRouter = require("./routes/productRouter");
const dbConnect = require("./config/dbConnect");
dbConnect();
var bodyParser = require("body-parser");


const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRounter");
const categoryRouter = require("./routes/categoryRouter");
const blogCategory = require("./routes/blohCtegoryRouter");
const brandRouter = require("./routes/brandRouter");
const couponRouter = require("./routes/couponRouter");
const cors = require("cors");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());
var cookieParser = require("cookie-parser");
app.use(cookieParser());


app.use("/api/blog", blogRouter);
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogCategory", blogCategory);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);

app.listen(PORT, () => {
  console.log("oki");
});
