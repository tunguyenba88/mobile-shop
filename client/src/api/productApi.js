import axios from 'axios';

export const createProduct = async (product, token) =>
  await axios.post(`/api/product`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getProductPerPage = async (current, limit) =>
  await axios.get(`/api/product?limit=${limit}&page=${current}`);

export const deleteProduct = async (slug, token) => {
  return await axios.delete(`/api/product/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOne = async (slug) => {
  return await axios.get(`/api/product/${slug}`);
};

export const updateProduct = async (slug, product, token) => {
  return await axios.put(`/api/product/${slug}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const danhGiaSp = async (productId, star, token) =>
  await axios.put(
    `/api/product/rating/${productId}`,
    { star },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getSanPhamLienQuan = async (slug) =>
  await axios.get(`/api/product/related/${slug}`);
