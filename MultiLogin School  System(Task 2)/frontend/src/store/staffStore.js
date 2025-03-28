import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";


export const staffStore = create((set) => ({
  staffs: null,
  singlestaffMember: null,
  loading: false,
  success: false,

  addStaff: async (data) => {
    set({ loading: true });
    try {
        await axios.post("/staff/addStaff", data);
        set({ loading: false, success: true });
        toast.success("Staff Added Successfully");
    } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.error || "An error occurred");
    }
  },
  getAllStaff: async (id) => {
    set({ loading: true });
    try {
        const response = await axios.get(`/staff/getAllStaff/${id}`);
        set({ loading: false, staffs: response.data.staff });
    } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.error || "An error occurred");
    }
  },
  getSingleStaff: async (id) => {
    set({loading: true});
    try {
      const response = await axios.get(`/staff/getSingleStaff/${id}`);
        set({ loading: false, singlestaffMember: response.data.staff });
    } catch (error) {
      set({ loading: false});
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  deleteStaff: async (id) => {
    set({loading: true});
    try {
      await axios.delete(`/staff/deleteStaff/${id}`);
      set({ loading: false, success: true, singlestaffMember: null  });
      toast.success("Staff Member Deleted Successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  updateStaff: async (id, data) => {
    set({loading: true});
    try {
      await axios.put(`/staff/editStaff/${id}`, data);
      set({ loading: false, success: true });
      toast.success("Staff Member Updated Successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  }
}));
