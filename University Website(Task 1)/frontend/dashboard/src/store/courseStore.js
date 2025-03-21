import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const courseStore = create((set) => ({
  courses: null,
  loading: false,
  facultyCourses:null,
  singleCourse: null,
  success:false,

  getCourses: async () => {
    set({ loading: true, success: false });
    try {
      const res = await axios.get("/courses");
        set({ courses: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getCourseByFaculty: async (name) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/courses/getCourseByFaculty/${name}`);
      set({ facultyCourses: res.data, loading: false });
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
  addCourse: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post("/courses", data);
      set({ loading: false });
      toast.success("Course added successfully!")
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  deleteCourse: async (id) => {
    set({ loading: true, success: false });
    try {
      const res = await axios.delete(`/courses/deleteCourse/${id}`);
      toast.success("Course deleted successfully!")
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
}));
