import axios from 'axios';

export const getAllCategories = async () => await axios.get(`/api/categories`);

export const getCategory = async (slug) =>
  await axios.get(`/api/categories/${slug}`);

export const createCategory = async (name, token) =>
  await axios.post(
    `/api/categories`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateCategory = async (slug, name, token) =>
  await axios.put(
    `/api/categories/${slug}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteCategory = async (slug, token) =>
  await axios.delete(`/api/categories/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
