import patients from "../../data/patients";
import { SensoredPatientsInformation, Patients } from "../types";

const getPatients = (): Patients[] => {
    return patients;
};

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
    addPatient
};