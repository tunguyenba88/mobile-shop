import axios from 'axios';

export const createOrUpdateUser = async (authToken) =>
  await axios.post(
    `/api/user/create-or-update-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const createOrderWithPayment = async (paymentIntent, authToken) =>
  await axios.post(
    `/api/user/create-order-with-payment`,
    { paymentIntent },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const createOrderCOD = async (authToken) => {
  return await axios.post(
    `/api/user/create-cod-order`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
};

export const getUserOrders = async (authToken) =>
  await axios.get(`/api/user/orders`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
export const wishlist = async (authToken) =>
  await axios.get(`/api/user/wishlist`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
export const addToWishlist = async (authToken, productId) =>
  await axios.post(
    `/api/user/wishlist`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
export const removeFromWishlist = async (authToken, productId) =>
  await axios.put(
    `/api/user/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
