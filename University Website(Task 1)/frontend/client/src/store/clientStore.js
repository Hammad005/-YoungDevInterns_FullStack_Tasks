
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const clientStore = create((set) => ({
  courses: null,
  singleCourse: null,
  notices: null,
  singleNotice:null,
  events: null,
  singleEvent:null,
  student: null,
  checkingAuth: false,
  loading: false,

  checkAuth: async () => {
    set({ checkingAuth: true });
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
    try {
      const res = await axios.get("/student/checkAuth");
      set({ student: res.data, loading: false });
    } catch (error) {
      set({ checkingAuth: false, student: null, error: error });
    } finally {
      set({ checkingAuth: false });
    }
  },

  getCourses: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/courses");
        set({ courses: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getSingleCourse: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/courses/getSingleCourse/${id}`);
      set({ singleCourse: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  getNotices: async () => {
    set({ loading: true});
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
  getSingleEvent: async (id) => {
      set({ loading: true });
      try {
        const res = await axios.get(`/events/${id}`);
        set({ singleEvent: res.data, loading: false });
      } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.error || "An error occurred");
      }
    },

  sendMessage: async (data) => {
    set({ loading: true });
    try {
      await axios.post(`/messages/sendMessage`, data);
      set({ loading: false });
      toast.success("Message Sent.")
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post(`/student/login`, data);
      set({ student: res.data.studentWithoutPassword,loading: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await axios.post(`/student/logout`);
      set({ student:null, loading: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
}));
