import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const messageStore = create((set) => ({
  messages: null,
  singleMessage: null,
  loading: false,
  success: false,

  getMessages: async () => {
    set({ loading: true, success: false });
    try {
      const res = await axios.get("/messages/getMessages");
      set({ messages: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getSingleMessage: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/messages/getSingleMessage/${id}`);
      set({ singleMessage: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
      
    } finally{
      set({ loading: false });
    }
  },
  deleteMessage: async (id) => {
    set({ loading: true, success: false });
    try {
      const res = await axios.delete(`/messages/deleteMessage/${id}`);
      toast.success(res.data.message);
      set({loading: false, success: true});
    } catch (error) {
      set({ loading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
    } 
  },

}));
