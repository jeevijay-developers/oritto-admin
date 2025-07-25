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

export const deleteCategoryAPI = async (name) => {
  try {
    const res = await apiClient.put("/v1/categories/delete-category", name);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// blog routes
export const getBlogs = async (data) => {
  try {
    const res = await apiClient.get("/blogs/getAllBlogs", data);
    return res.data;
  } catch (error) {
    throw err;
  }
};
export const addBlog = async (data) => {
  try {
    const res = await apiClient.post("/blogs/add-blog", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const res = await apiClient.get(`/v1/categories/get-category-by-id/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateCategoryById = async (id, data) => {
  try {
    const res = await apiClient.put(
      `/v1/categories/update-category-by-id/${id}`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getProductsById = async (id) => {
  try {
    const res = await apiClient.get(`/v1/products/product/by-id/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateProductById = async (id, data) => {
  try {
    const res = await apiClient.put(
      `/v1/products/product/update-by-id/${id}`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProductById = async (id) => {
  try {
    const res = await apiClient.delete(
      `/v1/products/product/delete-by-id/${id}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getSolutionById = async (id) => {
  try {
    const res = await apiClient.get(`/v1/solutions/get-solution-by-id/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateSolutionById = async (id, data) => {
  try {
    const res = await apiClient.put(
      `/v1/solutions/update-solution-by-id/${id}`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteSolutionById = async (id) => {
  try {
    const res = await apiClient.delete(
      `/v1/solutions/delete-solution-by-id/${id}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAttributeById = async (id) => {
  try {
    const res = await apiClient.get(`/v1/attributes/get-attribute-by-id/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateAttributeById = async (id, data) => {
  try {
    const res = await apiClient.put(
      `/v1/attributes/update-attribute-by-id/${id}`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteAttributeById = async (id) => {
  try {
    const res = await apiClient.delete(
      `/v1/attributes/delete-attribute-by-id/${id}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const addMechanicalFeaturesToProduct = async (id, data) => {
  console.log(data);

  try {
    const res = await apiClient.post(
      `/v1/products/products/${id}/mechanical-features`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const handleDelete = async (id) => {
  try {
    const res = await apiClient.delete(`/blogs/deleteBlog/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete error:", err);
    alert("Something went wrong.");
  }
};

export const fetchBlogs = async () => {
  try {
    const res = await apiClient.get(`/blogs/getAllBlogs/`);

    return res.data;
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }
};

export const fetchAllSolar = async () => {
  try {
    const res = await apiClient.get(`/v1/solar/get-all-solar`);
    return res.data;
  } catch (err) {
    console.error("Error fetching solar products:", err);
  }
};

export const addSolar = async (data) => {
  try {
    const res = await apiClient.post(`/v1/solar/create-solar`, data);
    return res.data;
  } catch (err) {
    console.error("Error adding solar product:", err);
    throw err;
  }
};

export const deleteSolarById = async (id) => {
  try {
    const res = await apiClient.delete(`/v1/solar/delete-solar/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting solar product:", err);
    throw err;
  }
};

export const getSolarById = async (id) => {
  try {
    const res = await apiClient.get(`/v1/solar/get-solar/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching solar product by ID:", err);
    throw err;
  }
};

export const updateSolarById = async (id, data) => {
  try {
    const res = await apiClient.put(`/v1/solar/update-solar/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating solar product by ID:", err);
    throw err;
  }
};
