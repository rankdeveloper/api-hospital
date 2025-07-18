import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  specialization: {
    type: String,
    required: true,
  },
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
