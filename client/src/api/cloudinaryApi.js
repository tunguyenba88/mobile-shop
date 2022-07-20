import axios from 'axios';

export const uploadImages = async (image, token) => {
  console.log(image, token);
  return await axios.post(
    `/api/cloudinary/upload-images`,
    { image: image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
