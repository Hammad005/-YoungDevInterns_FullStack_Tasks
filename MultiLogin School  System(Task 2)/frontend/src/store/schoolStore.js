import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { create } from "zustand";

export const schoolStore = create((set) => ({
  schools: null,
  singleSchool: null,
  schoolId:null,
  loading: false,
  success: false,

    getAllSchools: async () => {
        set({ loading: true, success: false });
        try {
        const response = await axios.get("/school/getAllSchool");
        set({ schools: response.data.schools, loading: false });
        } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.error || "An error occurred");
        }
    },
    addSchool: async (data) => {
        set({ loading: true });
        try {
        const response = await axios.post("/school/register", data);
        set({ success: true, loading: false, schoolId: response.data.newSchool._id });
        toast.success("School added successfully!");
        } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.error || "An error occurred");
        }
    },
    resetSuccess: async () => {
        set({ success: false });  
    },
    getSingleSchool: async (id) => {
        set({ loading: true });
        try {
        const response = await axios.get(`/school/getSingleSchool/${id}`);
        set({ singleSchool: response.data.school, loading: false });
        } catch (error) {
        set({ loading: false });
        toast.error(error.response.data.error || "An error occurred");
        }
    },
    deleteSchool: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`/school/deleteSchool/${id}`);
            set({ singleSchool: null, loading: false });
            toast.success("School deleted successfully!");
        } catch (error) {
            
        }
    }
}));
