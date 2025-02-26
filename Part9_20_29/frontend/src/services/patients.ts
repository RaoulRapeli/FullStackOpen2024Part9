import axios from "axios";
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id:string|undefined) =>{
  const { data } = await axios.get<Patient|undefined>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: EntryFormValues, userId:string|undefined) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${userId}/entries`,
    object
  );
  return data;
}

export default {
  getAll, create, getPatient, createEntry
};

