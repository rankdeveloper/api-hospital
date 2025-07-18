import express from "express";
import {
  addAppointment,
  deleteAppointment,
  editAppointment,
  getAppointments,
  getAppointmentsWithCardiologist,
  getAppointmentsWithDetails,
} from "../controllers/appointment";

const router = express.Router();

router.get("/", getAppointments);
router.get("/with-details", getAppointmentsWithDetails);
router.get("/cardiologist", getAppointmentsWithCardiologist);
router.post("/", addAppointment);
router.put("/:id", editAppointment);
router.delete("/:id", deleteAppointment);

export default router;
