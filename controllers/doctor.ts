import { pool } from "../config/connectDB";
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
//using postgres
export const p_addDoctor = async (req: any, res: any) => {
  const { name, age, specialization } = req.body;
  console.log(name, age, specialization);
  try {
    const response = await pool.query(
      "insert into doctor (name, age, specialization) values ($1, $2, $3) RETURNING *",
      [name, age, specialization]
    );
    res.status(200).json({
      message: "Doctor added successfully",
      doctor: response.rows[0],
    });
  } catch (error) {
    console.log(error);
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

//using postgres
export const p_getDoctors = async (req: any, res: any) => {
  try {
    const response = await pool.query("select * from doctor");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const editDoctor = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, age, specialization } = req.body;

    const doctor = await Doctor.findOneAndUpdate(
      { id },
      { name, age, specialization },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//using postgres
export const p_editDoctor = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, age, specialization } = req.body;
  try {
    const response = await pool.query(
      "update doctor set name = $1, age = $2, specialization = $3 where id = $4 RETURNING *",
      [name, age, specialization, id]
    );
    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: response.rows[0],
    });
  } catch (error) {
    console.log(error);
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

//using postgres
export const p_deleteDoctor = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "delete from doctor where id = $1 RETURNING *",
      [id]
    );
    if (response.rowCount === 0) {
      return res.status(404).send("Doctor not found");
    }
    res.status(200).json({
      message: "Doctor deleted successfully",
      doctor: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};
