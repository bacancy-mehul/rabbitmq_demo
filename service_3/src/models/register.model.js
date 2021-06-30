import { Schema, model } from "mongoose";

const registerSchema = Schema(
  {
    student_name: String,
    student_email: String,
    student_id:  Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ["Joined", "Registered"],
      default: "Registered",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

var Register = model("Register", registerSchema);

export default Register;
