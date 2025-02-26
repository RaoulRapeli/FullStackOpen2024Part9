export interface Diagnosis {
    code: string
    name: string
    latin?: string
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface Discharge {
    date: string
    criteria: string
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface SickLeave {
    startDate: string
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave: SickLeave
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patients {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
}

export type SensoredPatientsInformation = Omit<Patients, 'ssn' | 'entries'>;
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

