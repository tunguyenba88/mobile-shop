import axios from 'axios';

export const saveCart = async (cart, sl, total, authToken) =>
  await axios.post(
    `/api/cart/save`,
    { cart, sl, total },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const capNhatThongTinNguoiMuaHang = async (
  name,
  sdt,
  address,
  authToken
) =>
  await axios.put(
    `/api/cart/update-user-info`,
    { sdt, address, name },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
export const applyCoupon = async (coupon, authToken) =>
  await axios.put(
    `/api/cart/apply-coupon`,
    { coupon },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
export const getUserCart = async (authToken) =>
  await axios.get(`/api/cart/get-user-cart`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
