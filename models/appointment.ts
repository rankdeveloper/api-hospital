import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  patientId: {
    type: Number,
    required: true,
  },
  doctorId: {
    type: Number,
    required: true,
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
