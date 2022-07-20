import axios from 'axios';

export const currentUser = async (authToken) =>
  await axios.post(
    `/api/auth/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

export const currentAdmin = async (authToken) =>
  await axios.post(
    `/api/auth/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
