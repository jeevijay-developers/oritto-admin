import apiClient from "./axios";

// const query = process.env.NEXT_PUBLIC_API_URL_LOCAL;

// export const getAllTodaysOPDCamps = async () => {
//   try {
//     const res = await apiClient.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/opds/todays-opdcamps`
//     );
//     console.log("Todays data", res.data);

//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const getAllNextOPDs = async () => {
//   try {
//     const res = await apiClient.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/opds/opdcamps/next`
//     );
//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const getAllPreviousOPDCamps = async () => {
//   try {
//     const res = await apiClient.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/opds/opdcamps/previous-all`
//     );
//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };

export const getUserLoggedIn = async (data) => {
  try {
    const res = await apiClient.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/login`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const verifyToken = async (token) => {
  try {
    const res = await apiClient.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/varify-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getProductsBySlug = async (slug) => {
  try {
    const res = await apiClient.get(`/v1/products/product/by-slug/${slug}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getProductsByCategoryId = async (id) => {
  try {
    const res = await apiClient.get(`/v1/categories/get-category-by-id/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getProductsByApplicationId = async (id) => {
  try {
    const res = await apiClient.get(
      `/v1/applications/get-application-by-id/${id}`
    );
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
export const updateProductBySlug = async (slug, data) => {
  try {
    const res = await apiClient.put(
      `/v1/products/product/update/${slug}`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

// export const uploadBulkCoupon = async (data) => {
//   try {
//     const res = await apiClient.post(`/api/coupon/bulk`, data);
//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };

export const uploadSingleCoupon = async (data) => {
  try {
    const res = await apiClient.post(`/api/coupon/add-single`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllCoupons = async (data) => {
  try {
    const res = await apiClient.get(`/api/coupon/get-all`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getRegisteredPatients = async (data) => {
  try {
    const res = await apiClient.get("/registered-patients", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getRegisteredClinics = async (data) => {
  try {
    const res = await apiClient.get("/registered-clinics", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async (data) => {
  try {
    const res = await apiClient.get("/blogs/getAllBlogs", data);
    return res.data;
  } catch (error) {
    throw err;
  }
};
export const getAllProductQuery = async (page = 1, limit = 5) => {
  try {
    const res = await apiClient.get(
      `/v1/query/get-all-products?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const sendQueryMessage = async (data) => {
  try {
    const res = await apiClient.post(`/v1/query/send-reply`,data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteProductQuery = async (id) => {
  try {
    const res = await apiClient.delete(`/v1/query/delete-query/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
