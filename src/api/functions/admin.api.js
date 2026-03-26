import adminClient from "../axios.instance";

// ==================== AUTH FUNCTIONS ====================

export const login = async (payload) => {
  const res = await adminClient.post("/sign-in", payload);
  return res.data;
};

export const verifyOtp = async (payload) => {
  const res = await adminClient.post("/verify-otp", payload);
  return res.data;
};

export const sendOtp = async (payload) => {
  const res = await adminClient.post("/send-otp", payload);
  return res.data;
};

// ==================== ADMIN CRUD API ====================

export const adminApi = {
  // Get all admins
  getAll: async (params = {}) => {
    const response = await adminClient.get("/users", { params });
    return response.data;
  },

  // Get single admin
  getById: async (id) => {
    const response = await adminClient.get(`/users/${id}`);
    return response.data;
  },

  // Create admin
  create: async (data) => {
    console.log("Creating admin with data:", data);
    const response = await adminClient.post("/users", data);
    return response.data;
  },

  // Update admin
  update: async (id, data) => {
    const response = await adminClient.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete admin
  delete: async (id) => {
    const response = await adminClient.delete(`/users/${id}`);
    return response.data;
  },

  // Toggle status
  toggleStatus: async (id) => {
    const response = await adminClient.patch(`/users/${id}/status`);
    return response.data;
  },

  // Reset password
  resetPassword: async (id) => {
    const response = await adminClient.post(`/users/${id}/reset-password`);
    return response.data;
  },

  // Get stats
  getStats: async () => {
    const response = await adminClient.get("/stats");
    return response.data;
  },

  // Get profile
  getProfile: async () => {
    const response = await adminClient.get("/profile");
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await adminClient.put("/change-password", data);
    return response.data;
  },
};

export default adminApi;