import { Patient } from "../models/patient";

export const addPatient = async (req: any, res: any) => {
  try {
    const { id, name, age, contact } = req.body;

    if (!id || !name || !age || !contact) {
      return res.status(400).send("All fields are required");
    }

    const patient = new Patient({ id, name, age, contact });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getPatients = async (req: any, res: any) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const editPatient = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, age, contact } = req.body;

    const patient = await Patient.findOneAndUpdate({ id }, { name, age, contact }, { new: true });

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deletePatient = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findOneAndDelete({ id });

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
