import axios from 'axios';

export const getAllSubCategories = async () =>
  await axios.get(`/api/subCategory`);

export const getSubCategory = async (slug) =>
  await axios.get(`/api/subCategory/${slug}`);

export const createSubCategory = async (name, parent, token) =>
  await axios.post(
    `/api/subCategory`,
    { name, parent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateSubCategory = async (
  slug,
  name,
  newCategorySlug,
  oldParent,
  token
) => {
  return await axios.put(
    `/api/subCategory/${slug}`,
    { name, newCategorySlug, oldParent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteSubCategory = async (slug, token) =>
  await axios.delete(`/api/subCategory/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSubsByCategoryId = async (parentId) =>
  await axios.get(`/api/subCategory/category/${parentId}`);
