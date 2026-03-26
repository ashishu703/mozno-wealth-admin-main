// services/auth.js
import adminClient from "../axios.instance";

// ==================== AUTH FUNCTIONS ====================

// ✅ Fix: Add "/admin" prefix to all auth routes
export const login = async (payload) => {
  const res = await adminClient.post("/admin/sign-in", payload);
  return res.data;
};

export const verifyOtp = async (payload) => {
  const res = await adminClient.post("/admin/verify-otp", payload);
  return res.data;
};

export const sendOtp = async (payload) => {
  const res = await adminClient.post("/admin/send-otp", payload);
  return res.data;
};

// ==================== ADMIN CRUD API ====================

export const adminApi = {
  // Get all admins
  getAll: async (params = {}) => {
    const response = await adminClient.get("/admin/users", { params });
    return response.data;
  },

  // Get single admin
  getById: async (id) => {
    const response = await adminClient.get(`/admin/users/${id}`);
    return response.data;
  },

  // Create admin
  create: async (data) => {
    console.log("Creating admin with data:", data);
    const response = await adminClient.post("/admin/users", data);
    return response.data;
  },

  // Update admin
  update: async (id, data) => {
    const response = await adminClient.put(`/admin/users/${id}`, data);
    return response.data;
  },

  // Delete admin
  delete: async (id) => {
    const response = await adminClient.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Toggle status
  toggleStatus: async (id) => {
    const response = await adminClient.patch(`/admin/users/${id}/status`);
    return response.data;
  },

  // Reset password
  resetPassword: async (id) => {
    const response = await adminClient.post(`/admin/users/${id}/reset-password`);
    return response.data;
  },

  // Get stats
  getStats: async () => {
    const response = await adminClient.get("/admin/stats");
    return response.data;
  },

  // Get profile
  getProfile: async () => {
    const response = await adminClient.get("/admin/profile");
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await adminClient.put("/admin/change-password", data);
    return response.data;
  },
};

export default adminApi;
