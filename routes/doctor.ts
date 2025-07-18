import express from "express";
import { addDoctor, deleteDoctor, editDoctor, getDoctors } from "../controllers/doctor";

const router = express.Router();

router.get("/", getDoctors);
router.post("/", addDoctor);
router.put("/:id", editDoctor);
router.delete("/:id", deleteDoctor);

export default router;
