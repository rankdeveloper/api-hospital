import express from "express";
import {
  addDoctor,
  deleteDoctor,
  editDoctor,
  getDoctors,
} from "../controllers/doctor";
//for postgres
import {
  p_addDoctor,
  p_deleteDoctor,
  p_editDoctor,
  p_getDoctors,
} from "../controllers/doctor";

const router = express.Router();

// router.get("/", getDoctors);
// router.post("/", addDoctor);
// router.put("/:id", editDoctor);
// router.delete("/:id", deleteDoctor);
router.get("/", p_getDoctors);
router.post("/", p_addDoctor);
router.put("/:id", p_editDoctor);
router.delete("/:id", p_deleteDoctor);

export default router;
