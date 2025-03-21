import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [{
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        assignedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: { 
          type: Date, 
          default: Date.now 
        }
    }]
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
