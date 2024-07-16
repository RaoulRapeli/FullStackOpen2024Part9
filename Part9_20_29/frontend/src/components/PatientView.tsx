import { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { Diagnosis, Entry, Patient } from "../types";
import { Button, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import HospitalEnrtyTemplate from "./Entries/HospitalEntry";
import HealthCheckEntryTemplate from "./Entries/HealthCheckEntry";
import OccupationalHealthcareEntryTemplate from "./Entries/OccupationalHealthcareEntry";
import EntryForm from "./Entries/EntryForm";
import { EntryFormValues } from "../types";
import axios from 'axios';


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const PatientView = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [patient, setPatient] = useState<Patient | undefined>();
    const [diagnosis, setDiagnosis] = useState<Diagnosis[] | undefined>([]);
    const [entryForm, setEntryForm] = useState<boolean>(false);
    const params = useParams();
    useEffect(() => {
        const fetchPatientData = async () => {
            const tempPatient = await patientService.getPatient(params.id);
            const tempDiagnosis = await diagnosesService.getAll();
            setPatient(tempPatient);
            setDiagnosis(tempDiagnosis);
        };
        void fetchPatientData();
    }, []);

    useEffect(() => {
        if(errorMessage!==""){
            setTimeout(() => {
                setErrorMessage("");
              }, 5000);
        }
    }, [errorMessage]);

    const sendData = async (data: EntryFormValues) => {
        try {
            const addedEntry = await patientService.createEntry(data, params.id);
            const tempPatient = structuredClone(patient);
            tempPatient?.entries.push(addedEntry);
            setPatient(tempPatient);
            setEntryForm(false);
            setErrorMessage("");
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setErrorMessage(message);
                } else {
                    setErrorMessage("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setErrorMessage("Unknown error");
            }
        }
    }

    const EntryDetails = ({ entry }: { entry: Entry }) => {
        switch (entry.type) {
            case "Hospital":
                return (<HospitalEnrtyTemplate entry={entry} />);
            case "HealthCheck":
                return (<HealthCheckEntryTemplate entry={entry} />);
            case "OccupationalHealthcare":
                return (<OccupationalHealthcareEntryTemplate entry={entry} />);
            default:
                return assertNever(entry);
        }
    };

    return (
        <div>
            <Typography variant="h3" style={{ marginBottom: "1em", marginTop: "1em" }}>
                {patient?.name} {
                    patient?.gender === "male" ? <MaleIcon /> :
                        patient?.gender === "female" ? <FemaleIcon /> :
                            patient?.gender === "other" ? <TransgenderIcon /> :
                                null
                }
            </Typography>
            <div>
                ssh: {patient?.ssn}
            </div>
            <div>
                occupation: {patient?.occupation}
            </div>
            <div style={{ color: "red", padding: 5 }}>
                {errorMessage}
            </div>
            {entryForm ?
                <EntryForm setEntryForm={setEntryForm} sendData={sendData} diagnosis={diagnosis} /> :
                null
            }
            <Typography variant="h4" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
                entries
            </Typography>
            <div>
                {patient?.entries.map((entry: Entry) => {
                    return (
                        <div style={{ paddingTop: 10 }}>
                            {<EntryDetails entry={entry} />}
                            {/* {entry.date} {entry.description} */}
                            {/* <ul>
                                {entry.diagnosisCodes?.map((code: string) => {
                                    return (
                                        <li>{code} {diagnosis?.find(diagnose => diagnose.code === code)?.name}</li>
                                    );
                                })}
                            </ul> */}
                        </div>
                    );
                })}
                <Button style={{ marginTop: 10 }} variant="contained" onClick={() => setEntryForm(true)}>ADD NEW ENTRY</Button>
            </div>
        </div>
    );
};

export default PatientView;