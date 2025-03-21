import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const userStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  totalUsers: null,
  totalAdmins: null,
  faculties: null,
  faculty:null,
  success: false,
  admins:null,

  checkAuth: async () => {
    set({ checkingAuth: true });
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1500)
    );
    try {
      const res = await axios.get("/auth/getUserData");
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ checkingAuth: false, user: null, error: error });
    } finally {
      set({ checkingAuth: false });
    }
  },
  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", data);
      set({ user: res.data.userWithoutPassword, loading: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  addFaculty: async (data) => {
    set({ loading: true });
    try {
      await axios.post("/auth/register", data);
    set({ loading: false });
    toast.success("Faculty added successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getTotalUsers: async () => {
    set({ loading: true, success: false });
    try {
      const res = await axios.get("/auth/getTotalUser");
      set({ totalUsers: res.data.totalUsers, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getAllFaculties: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/getAllFaculty");
      set({ faculties: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getSingleFaculty: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/auth/getSingleFaculty/${id}`);
      set({ faculty: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getTotalAdmins: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/getTotalAdmin");
      set({ totalAdmins: res.data.totalAdmins, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getAdmins: async () => {
    set({ loading: true });
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1500)
    );
    try {
      const res = await axios.get("/auth/getAdmins");
      set({ admins: res.data.totalAdmins, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  deleteUser: async (id) => {
    set({ loading: true, success: false });
    try {
      const res = await axios.delete(`/auth/removeUser/${id}`);
      toast.success("Faculty deleted successfully");
      set({ success: true, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  makeAdmin: async (id) => {
    set({ loading: true, success: false});
    try {
      const res = await axios.put(`/auth/make-admin/${id}`);
      toast.success("Faculty promoted to admin successfully");
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  makeFaculty: async (id) => {
    set({ loading: true, success: false});
    try {
      const res = await axios.put(`/auth/make-faculty/${id}`);
      toast.success("Faculty demoted successfully");
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
}));
