import express from "express";
import { getPatients, addPatient, editPatient, deletePatient } from "../controllers/patient";

const router = express.Router();

router.get("/", getPatients);
router.post("/", addPatient);
router.put("/:id", editPatient);
router.delete("/:id", deletePatient);

export default router;
