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

export const getAppointments = async (req: any, res: any) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const editAppointment = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { date, patientId, doctorId } = req.body;

    const appointment = await Appointment.findOneAndUpdate({ id }, { date, patientId, doctorId }, { new: true });

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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
