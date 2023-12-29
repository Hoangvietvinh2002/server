const cloudinary = require("cloudinary").v2;

const clien = cloudinary.config({
  cloud_name: "db2n15qja",
  api_key: "679496639343662",
  api_secret: "2E-c_l85UcZMW_0nrbIAgw_NBPg",
});

// const result = cloudinary.uploader.upload("E:/demo/public/images/images-1696367183193-380647140.jpg").then(data=>{
//   console.log(data)
// }).catch(err=>{
//   console.log(err)
// });

const uploadCloudirary = async (fileUpload) => {
  const result = await cloudinary.uploader.upload(fileUpload);
  return { url: result.secure_url, resource_type: "auto" };
};

module.exports = uploadCloudirary;
