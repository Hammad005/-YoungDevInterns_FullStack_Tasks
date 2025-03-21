import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const noticeStore = create((set) => ({
  notices: null,
  loading: false,
  singleNotice: null,
  success: false,

  getNotices: async () => {
    set({ loading: true, success: false });
    try {
      const res = await axios.get("/notices");
        set({ notices: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getSingleNotice: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/notices/getSingleNotice/${id}`);
      set({ singleNotice: res.data, loading: false });
      
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  addNotice: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post("/notices", data);
      set({ loading: false });
      toast.success("Notice added successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  deleteNotice: async (id) => {
    set({ loading: true, success:false });
    try {
      const res = await axios.delete(`/notices/${id}`);
      toast.success("Notice deleted successfully");
      set({ loading: false, success:true });
    } catch (error) {
      set({ loading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  }

}));
