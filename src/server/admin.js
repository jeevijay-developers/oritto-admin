import apiClient from "./axios";

export const getAllCategories = async () => {
  try {
    const res = await apiClient.get(`/v1/categories/get-all-categories`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getAllApplications = async () => {
  try {
    const res = await apiClient.get(`/v1/applications/get-all-applications`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
