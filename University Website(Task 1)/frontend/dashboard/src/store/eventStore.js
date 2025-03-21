import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const eventStore = create((set) => ({
  events: null,
  event:null,
  loading: false,
  success: false,

  getEvents: async () => {
    set({ loading: true, success: false });
    try {
      const res = await axios.get("/events");
        set({ events: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  addEvent: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post("/events", data);
      set({ loading: false });
      toast.success('Event created successfully!')
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getSingleEvent: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/events/${id}`);
      set({ event: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  deleteEvent: async (id) => {
    set({ loading: true, success: false });
    try {
      const res = await axios.delete(`/events/${id}`);
      toast.success('Event deleted successfully!')
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
    } 
  }

}));
