import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const studentStore = create((set, get) => ({
  students: null,
  loading: false,
  student:null,
  success:false,
  deassignSuccess: false,

  getStudents: async () => {
    set({ loading: true, success: false });
    try {
      const res = await axios.get("/student/getStudents");
        set({ students: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  addStudent: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post("/student/register", data);
      set({ loading: false });
      toast.success("Student registered successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  getSingleStudent: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/student/getSingleStudent/${id}`);
      set({ student: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  deleteStudent: async (id) => {
    set({ loading: true, success: false });
    try {
      const res = await axios.delete(`/student/deleteStudent/${id}`);
      toast.success("Student deleted successfully");
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  assignCourse: async (courseId, studentId ) => {
    set({ loading: true });
    try {
      const res = await axios.put(`/student/enroll/${courseId}`, {studentId});
      set({ loading: false });
      toast.success("Course assigned successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  deassignCourse: async (courseId, studentId ) => {
    set({ deassignSuccess: false });
    try {
      const res = await axios.put(`/student/unenroll/${courseId}`, {studentId});
      set({ deassignSuccess: true });
      get().getSingleStudent(studentId);
      toast.success("Course deassigned successfully");
    } catch (error) {
      set({ deassignSuccess: false });
      toast.error(error.response.data.error || "An error occurred");
    } finally{
      set({ deassignSuccess: false });
    }
  },

}));
