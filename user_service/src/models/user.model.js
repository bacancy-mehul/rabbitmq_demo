import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: String,
    bio: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

let User = model("User", userSchema);

export default User;
