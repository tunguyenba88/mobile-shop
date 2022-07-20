import axios from 'axios';

export const getCoupons = async () => await axios.get(`/api/coupon/list`);

export const removeCoupon = async (couponId, token) => {
  return await axios.delete(`/api/coupon/delete/${couponId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateCoupon = async (
  name,
  expireIn,
  discount,
  couponId,
  token
) => {
  return await axios.put(
    `/api/coupon/update/${couponId}`,
    { name, expireIn, discount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createCoupon = async (name, expireIn, discount, token) =>
  await axios.post(
    `/api/coupon/create`,
    {
      name,
      expireIn,
      discount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
