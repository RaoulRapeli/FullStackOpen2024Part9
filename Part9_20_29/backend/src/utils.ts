import { Patients, Gender, Entry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Discharge, HealthCheckRating, SickLeave } from './types';
import { v1 as uuid } from 'uuid'
const id = uuid()

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

export const toNewPatientEntry = (object: unknown): Patients => {

    if ((!object || typeof object !== 'object')) {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        if (!isString(id.toString())) {
            throw new Error('Id is not in String format');
        }
        if (!isString(object.name)) {
            throw new Error('Name is not in String format');
        }
        if (!isString(object.dateOfBirth)) {
            throw new Error('DateOfBirth is not in String format');
        }
        if (!isString(object.ssn)) {
            throw new Error('Ssn is not in String format');
        }
        if (!isString(object.gender)) {
            throw new Error('Gender is not in String format');
        }
        if (!isGender(object.gender)) {
            throw new Error('Gender is not a real gender');
        }
        if (!isString(object.occupation)) {
            throw new Error('Occupation is not in String format');
        }
        const newPatientEntry: Patients = {
            id: id.toString(),
            name: object.name,
            dateOfBirth: object.dateOfBirth,
            ssn: object.ssn,
            gender: object.gender as Gender,
            occupation: object.occupation,
            entries: []
        };
        return newPatientEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object' || !('discharge' in object)) {
        // we will just trust the data to be in correct form
        return {} as Discharge;
    }
    return object.discharge as Discharge;
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
    if (!object || typeof object !== 'object' || !('healthCheckRating' in object)) {
        // we will just trust the data to be in correct form
        return 0 as HealthCheckRating;
    }
    return object.healthCheckRating as HealthCheckRating;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
        // we will just trust the data to be in correct form
        return {} as SickLeave;
    }
    return object.sickLeave as SickLeave;
};

export const toNewEntry = (object: unknown): Entry => {

    if ((!object || typeof object !== 'object')) {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object) {
        if (!isString(id.toString())) {
            throw new Error('Id is not in String format');
        }
        if (!isString(object.description)) {
            throw new Error('Description is not in String format');
        }
        if (!isString(object.date)) {
            throw new Error('Date is not in String format');
        }
        if (!isString(object.specialist)) {
            throw new Error('Specialist is not in String format');
        }
        if(!parseDiagnosisCodes(object)){
            throw new Error('DiagnosisCodes is not in Correct format');
        }
        if(!isString(object.type)){
            throw new Error('Type is not in Correct format');
        }
        switch(object.type){
            case "Hospital":
                if('discharge' in object){
                    if(!parseDischarge(object)){
                        throw new Error('discharge is not in Correct format');
                    }
                    const newEntry: HospitalEntry = {
                        id: id.toString(),
                        description: object.description,
                        date: object.date,
                        specialist: object.specialist,
                        diagnosisCodes: object.diagnosisCodes as Array<Diagnosis['code']>,
                        discharge: object.discharge as Discharge,
                        type:"Hospital",
                    };
                    return newEntry;  
                }
                else{
                    throw new Error('Incorrect data: some fields are missing')
                }
            case "HealthCheck":
                if('healthCheckRating' in object){
                    if(!parseHealthCheckRating(object)){
                        throw new Error('HealthCheckRating is not in Correct format');
                    }
                    const newEntry: HealthCheckEntry = {
                        id: id.toString(),
                        description: object.description,
                        date: object.date,
                        specialist: object.specialist,
                        diagnosisCodes: object.diagnosisCodes as Array<Diagnosis['code']>,
                        healthCheckRating: object.healthCheckRating as HealthCheckRating,
                        type:"HealthCheck"
                        
                    };
                    return newEntry;  
                }
                else{
                    throw new Error('Incorrect data: some fields are missing')
                }
            case "OccupationalHealthcare":
                if('employerName' in object && 'sickLeave' in object){
                    if(!isString(object.employerName)){
                        throw new Error('EmployerName is not in Correct format');
                    }
                    if(!parseSickLeave(object.sickLeave)){
                        throw new Error('SickLeave is not in Correct format');
                    }
                    const newEntry: OccupationalHealthcareEntry = {
                        id: id.toString(),
                        description: object.description,
                        date: object.date,
                        specialist: object.specialist,
                        diagnosisCodes: object.diagnosisCodes as Array<Diagnosis['code']>,
                        sickLeave: object.sickLeave as SickLeave,
                        employerName: object.employerName,
                        type:"OccupationalHealthcare"
                        
                    };
                    return newEntry;  
                }
                else{
                    throw new Error('Incorrect data: some fields are missing')
                }
            default:
                throw new Error('Wrong type');
        }
    }
    throw new Error('Incorrect data: some fields are missing');
}