import { Patients, Gender } from './types';
import { v1 as uuid } from 'uuid'
const id = uuid()

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const toNewPatientEntry = (object: unknown): Patients => {

    if ((!object || typeof object !== 'object')) {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        if(!isString(id.toString())){
            throw new Error('Id is not in String format');
        }
        if(!isString(object.name)){
            throw new Error('Name is not in String format');
        }
        if(!isString(object.dateOfBirth)){
            throw new Error('DateOfBirth is not in String format');
        }
        if(!isString(object.ssn)){
            throw new Error('Ssn is not in String format');
        }
        if(!isString(object.gender)){
            throw new Error('Gender is not in String format');
        }
        if(!isGender(object.gender)){
            throw new Error('Gender is not a real gender');
        }
        if(!isString(object.occupation)){
            throw new Error('Occupation is not in String format');
        }
        const newEntry: Patients = {
            id: id.toString(),
            name: object.name,
            dateOfBirth: object.dateOfBirth,
            ssn: object.ssn,
            gender: object.gender,
            occupation: object.occupation,
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatientEntry;