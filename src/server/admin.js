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

export const createNewCategory = async (data) => {
  try {
    const res = await apiClient.post(`/v1/categories/create-category`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createNewProduct = async (data) => {
  try {
    const res = await apiClient.post(`/v1/products/products/add-new`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const createNewApplication = async (data) => {
  try {
    const res = await apiClient.post(
      `/v1/applications/create-application`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createNewAttribute = async (data) => {
  try {
    const res = await apiClient.post(`/v1/attributes/add-new-attribute`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllAttributes = async () => {
  try {
    const res = await apiClient.get(`/v1/attributes/get-all-attributes`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createNewSolution = async (data) => {
  try {
    const res = await apiClient.post(`/v1/solutions/create-solution`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllSolutions = async () => {
  try {
    const res = await apiClient.get(`/v1/solutions/get-all-solutions`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const res = await apiClient.get(`/v1/products/all-products`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
