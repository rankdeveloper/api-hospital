import express from "express";
import {
  getPatients,
  addPatient,
  editPatient,
  deletePatient,
} from "../controllers/patient";

//for postgres
import {
  p_addPatient,
  p_getPatients,
  p_editPatient,
  p_deletePatient,
} from "../controllers/patient";

const router = express.Router();

// router.get("/", getPatients);
// router.post("/", addPatient);
// router.put("/:id", editPatient);
// router.delete("/:id", deletePatient);

router.get("/", p_getPatients);
router.post("/", p_addPatient);
router.put("/:id", p_editPatient);
router.delete("/:id", p_deletePatient);

export default router;
