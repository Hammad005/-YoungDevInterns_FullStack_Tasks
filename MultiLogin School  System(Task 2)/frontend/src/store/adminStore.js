import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const adminStore = create((set) => ({
  admin: null,
  loading: false,
  checkingAuth: true,
  totalSchools: null,
  success: false,

  checkAuth: async () => {
    try {
      const response = await axios.get("/auth/checkAuth");
      set({ admin: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, admin: null, error: error });
    } finally {
      set({ checkingAuth: false });
    }
  },
  login: async (data) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/login", data);
      set({ admin: response.data.adminWithoutPassword, loading: false });
      toast.success("Login Successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ admin: null });
      toast.success("Logout Successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  registerSchoolAdmin: async (data) => {
    set({ loading: true });
    try {
      await axios.post("/auth/register", data);
      set({ loading: false, success: true });
      toast.success('School Admin registered successfully');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  resetSuccess: () => set({ success: false }),
}));
