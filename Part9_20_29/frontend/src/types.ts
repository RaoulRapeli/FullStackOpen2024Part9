export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
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
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type EntryFormValues = HospitalEntryFormValues | OccupationalHealthcareEntryFormValues | HealthCheckEntryFormValues;