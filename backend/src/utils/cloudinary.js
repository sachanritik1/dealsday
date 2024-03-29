import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(
      "File uploaded on cloudinary successfully",
      response.secure_url
    );
    return response;
  } catch (err) {
    console.log("File upload on cloudinary failed" + err);
  } finally {
    fs.unlink(localFilePath, (err) => {
      if (err) console.log("Error deleting local file", err);
    });
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    const response = await cloudinary.uploader.destroy(publicId);
    console.log("File deleted from cloudinary", response);
  } catch (err) {
    console.log("File deletion from cloudinary failed");
  }
};
