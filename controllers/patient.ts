import { pool } from "../config/connectDB";
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

//using postgres
export const p_addPatient = async (req: any, res: any) => {
  const { name, gender, contact } = req.body;
  try {
    const response = await pool.query(
      "insert into patient (name, gender, contact) values ($1, $2, $3) RETURNING *",
      [name, gender, contact]
    );
    res.status(200).json({
      message: "Patient added successfully",
      patient: response.rows[0],
    });
  } catch (error) {
    console.log(error);
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
// using postgres
export const p_getPatients = async (req: any, res: any) => {
  try {
    const response = await pool.query("select * from patient");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const editPatient = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, age, contact } = req.body;

    const patient = await Patient.findOneAndUpdate(
      { id },
      { name, age, contact },
      { new: true }
    );

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//usig postgres
export const p_editPatient = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, gender, contact } = req.body;
  try {
    const response = await pool.query(
      "update patient set name = $1, gender = $2, contact = $3 where id = $4 RETURNING *",
      [name, gender, contact, id]
    );
    res.status(200).json({
      message: "Patient updated successfully",
      patient: response.rows[0],
    });
  } catch (error) {
    console.log(error);
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

// using postgres
export const p_deletePatient = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "delete from patient where id = $1 RETURNING *",
      [id]
    );
    if (response.rows.length === 0) {
      return res.status(404).send("Patient not found");
    }
    res.status(200).json({
      message: "Patient deleted successfully",
      patient: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
