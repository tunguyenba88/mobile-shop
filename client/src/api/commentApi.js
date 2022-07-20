import axios from 'axios';

export const cmtSp = async (productId, comment, token) =>
  await axios.post(
    `/api/comment/${productId}`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const listCmtByProductId = async (slugProduct) =>
  await axios.get(`/api/comment/${slugProduct}`);
