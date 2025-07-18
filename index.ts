import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import patientRouter from "./routes/patient";
import doctorRouter from "./routes/doctor";
import appointmentRouter from "./routes/appointment";
import { connectDB } from "./config/connectDB";

dotEnv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/patients", patientRouter);
app.use("/doctors", doctorRouter);
app.use("/appointments", appointmentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
