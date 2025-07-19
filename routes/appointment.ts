import express from "express";
import {
  addAppointment,
  deleteAppointment,
  editAppointment,
  getAppointments,
  getAppointmentsWithCardiologist,
  getAppointmentsWithDetails,
} from "../controllers/appointment";

//for postgres
import {
  p_addAppointment,
  p_deleteAppointment,
  p_editAppointment,
  p_getAppointments,
  p_getAppointmentsWithCardiologist,
  p_getAppointmentsWithDetails,
} from "../controllers/appointment";

const router = express.Router();

//for mongo
// router.get("/", getAppointments);
// router.get("/with-details", getAppointmentsWithDetails);
// router.get("/cardiologist", getAppointmentsWithCardiologist);
// router.post("/", addAppointment);
// router.put("/:id", editAppointment);
// router.delete("/:id", deleteAppointment);

// using postgres
router.get("/", p_getAppointments);
router.get("/with-details", p_getAppointmentsWithDetails);
router.get("/cardiologist", p_getAppointmentsWithCardiologist);
router.post("/", p_addAppointment);
router.put("/:id", p_editAppointment);
router.delete("/:id", p_deleteAppointment);

export default router;
