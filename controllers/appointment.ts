import { pool } from "../config/connectDB";
import { Appointment } from "../models/appointment";

export const addAppointment = async (req: any, res: any) => {
  try {
    const { id, date, patientId, doctorId } = req.body;

    if (!id || !date || !patientId || !doctorId) {
      return res.status(400).send("All fields are required");
    }

    const appointment = new Appointment({ id, date, patientId, doctorId });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//for postgres
export const p_addAppointment = async (req: any, res: any) => {
  const { patientId, doctorId, date, status } = req.body;
  try {
    const response = await pool.query(
      "insert into appointments (patientId, doctorId, date, status) values ($1, $2, $3, $4) RETURNING *",
      [patientId, doctorId, date, status]
    );
    res.status(200).json({
      message: "Appointment added successfully",
      appointment: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointments = async (req: any, res: any) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
// using postgres
export const p_getAppointments = async (req: any, res: any) => {
  try {
    const response = await pool.query("select * from appointments");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const editAppointment = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { date, patientId, doctorId } = req.body;

    const appointment = await Appointment.findOneAndUpdate(
      { id },
      { date, patientId, doctorId },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//using postgres
export const p_editAppointment = async (req: any, res: any) => {
  const { id } = req.params;
  const { date, patientId, doctorId, status } = req.body;
  try {
    const response = await pool.query(
      "update appointments set date = $1, patientId = $2, doctorId = $3 , status = $5 where id = $4 RETURNING *",
      [date, patientId, doctorId, id, status]
    );
    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAppointment = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findOneAndDelete({ id });

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// using postgres
export const p_deleteAppointment = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "delete from appointments where id = $1 RETURNING *",
      [id]
    );
    if (response.rowCount === 0) {
      return res.status(404).send("Appointment not found");
    }
    res.status(200).json({
      message: "Appointment deleted successfully",
      appointment: response.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentsWithDetails = async (req: any, res: any) => {
  try {
    const appointments = await Appointment.aggregate([
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "id",
          as: "patient",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "id",
          as: "doctor",
        },
      },
      { $unwind: "$patient" },
      { $unwind: "$doctor" },
      {
        $project: {
          _id: 0,
          id: 1,
          date: 1,
          patientId: "$patient.id",
          patientName: "$patient.name",
          doctorId: "$doctor.id",
          doctorName: "$doctor.name",
          doctorSpecialization: "$doctor.specialization",
        },
      },
    ]);
    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// using postgres
export const p_getAppointmentsWithDetails = async (req: any, res: any) => {
  try {
    const response = await pool.query(
      `SELECT a.id, a.date, p.id AS patientId, p.name AS patientName, 
              d.id AS doctorId, d.name AS doctorName, d.specialization 
       FROM appointments a
       JOIN patients p ON a.patientId = p.id
       JOIN doctors d ON a.doctorId = d.id`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentsWithCardiologist = async (req: any, res: any) => {
  try {
    const appointments = await Appointment.aggregate([
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "id",
          as: "patient",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "id",
          as: "doctor",
        },
      },
      { $unwind: "$patient" },
      { $unwind: "$doctor" },
      {
        $match: {
          "doctor.specialization": "Cardiologist",
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          date: 1,
          patientId: "$patient.id",
          patientName: "$patient.name",
          doctorId: "$doctor.id",
          doctorName: "$doctor.name",
          doctorSpecialization: "$doctor.specialization",
        },
      },
    ]);
    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// using postgres
export const p_getAppointmentsWithCardiologist = async (req: any, res: any) => {
  try {
    const response = await pool.query(
      `SELECT a.id, a.date, p.id AS patientId, p.name AS patientName, 
              d.id AS doctorId, d.name AS doctorName, d.specialization 
       FROM appointments a
       JOIN patients p ON a.patientId = p.id
       JOIN doctors d ON a.doctorId = d.id
       WHERE d.specialization = 'Cardiologist'`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
  }
};
