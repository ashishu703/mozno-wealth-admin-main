// services/auth.js
import adminClient from "../axios.instance";

// ✅ Ab sahi URL use karo
export const login = async (payload) => {
  const res = await adminClient.post("/api/admin/sign-in", payload);
  return res.data;
};

export const verifyOtp = async (payload) => {
  const res = await adminClient.post("/api/admin/verify-otp", payload);
  return res.data;
};

export const sendOtp = async (payload) => {
  const res = await adminClient.post("/api/admin/send-otp", payload);
  return res.data;
};

// Admin CRUD APIs
export const adminApi = {
  getAll: async (params = {}) => {
    const response = await adminClient.get("/api/admin/users", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await adminClient.get(`/api/admin/users/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await adminClient.post("/api/admin/users", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await adminClient.put(`/api/admin/users/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await adminClient.delete(`/api/admin/users/${id}`);
    return response.data;
  },

  toggleStatus: async (id) => {
    const response = await adminClient.patch(`/api/admin/users/${id}/status`);
    return response.data;
  },

  resetPassword: async (id) => {
    const response = await adminClient.post(`/api/admin/users/${id}/reset-password`);
    return response.data;
  },

  getStats: async () => {
    const response = await adminClient.get("/api/admin/stats");
    return response.data;
  },

  getProfile: async () => {
    const response = await adminClient.get("/api/admin/profile");
    return response.data;
  },

  changePassword: async (data) => {
    const response = await adminClient.put("/api/admin/change-password", data);
    return response.data;
  },
};
