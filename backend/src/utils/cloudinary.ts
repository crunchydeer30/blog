import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (imageToUpload: string) => {
  const cloudinaryImageUploadResponseData = await cloudinary.uploader.upload(
    imageToUpload,
    {
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      cloud_name: process.env.CLOUD_NAME,
    }
  );

  return cloudinaryImageUploadResponseData;
};

export const deleteImage = async (publicId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response = await cloudinary.uploader.destroy(publicId);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response;
};
