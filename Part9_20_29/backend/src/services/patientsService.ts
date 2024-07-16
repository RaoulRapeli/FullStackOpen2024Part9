import patients from "../../data/patients";
import { SensoredPatientsInformation, Patients } from "../types";

const getPatients = (): Patients[] => {
    return patients;
};

const getPatient = (id:string):Patients | undefined => {
    return patients.find(patient => patient.id === id)
}

const getSensoredPatiens = (): SensoredPatientsInformation[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = (newPatient:Patients):Patients => {
    patients.push(newPatient)
    return newPatient;
};

export default {
    getPatients,
    getSensoredPatiens,
    addPatient,
    getPatient
};