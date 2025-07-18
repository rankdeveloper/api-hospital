import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
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

  contact: {
    type: String,
    required: true,
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
