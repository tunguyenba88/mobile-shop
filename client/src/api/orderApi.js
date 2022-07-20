import axios from 'axios';

export const listOrder = async (authToken) =>
  await axios.get(`/api/order/list`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
export const getOrder = async (authToken, orderId) =>
  await axios.get(`/api/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

export const updateOrderStatus = async (authToken, orderId, orderStatus) =>
  await axios.put(
    `/api/order/update-status`,
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
