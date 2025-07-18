import { Doctor } from "../models/doctor";

export const addDoctor = async (req: any, res: any) => {
  try {
    const { id, name, age, specialization } = req.body;

    if (!id || !name || !age || !specialization) {
      return res.status(400).send("All fields are required");
    }

    const doctor = new Doctor({ id, name, age, specialization });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getDoctors = async (req: any, res: any) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const editDoctor = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, age, specialization } = req.body;

    const doctor = await Doctor.findOneAndUpdate({ id }, { name, age, specialization }, { new: true });

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteDoctor = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findOneAndDelete({ id });

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
