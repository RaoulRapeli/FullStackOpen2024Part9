import { MenuItem, Select, FormControl, InputLabel, Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { MouseEvent, useState } from 'react';
import { HealthCheckRating, EntryFormValues, HealthCheckEntryFormValues, HospitalEntryFormValues, OccupationalHealthcareEntryFormValues, Diagnosis } from '../../types';

interface Props {
    setEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
    sendData: (data: EntryFormValues) => Promise<void>
    diagnosis: Diagnosis[]
}

const EntryForm = ({ setEntryForm, sendData, diagnosis}: Props) => {
    const [type, setType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

    const handleAdd = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        switch (type) {
            case "HealthCheck":
                const newHealthCheckEntry: HealthCheckEntryFormValues = {
                    type: "HealthCheck",
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: [diagnosisCodes],
                    healthCheckRating: healthCheckRating as HealthCheckRating
                };
                sendData(newHealthCheckEntry);
                return true
            case "Hospital":
                const newHospitalEntry: HospitalEntryFormValues = {
                    type: "Hospital",
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: [diagnosisCodes],
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                }
                sendData(newHospitalEntry);
                return true
            case "OccupationalHealthcare":
                const newOccupationalHealthcareEntry: OccupationalHealthcareEntryFormValues = {
                    type: "OccupationalHealthcare",
                    description: description,
                    date: date,
                    specialist: specialist,
                    diagnosisCodes: [diagnosisCodes],
                    employerName: employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }
                }
                sendData(newOccupationalHealthcareEntry);
                return true

            default:
                return null
        }

    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: "100%",
                        height: "auto",
                        padding: 2,
                    },
                }}
            >
                <Paper elevation={3} >
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select onChange={(e) => setType(e.target.value)}>
                            <MenuItem value={"HealthCheck"}>
                                HealthCheck
                            </MenuItem>
                            <MenuItem value={"Hospital"}>
                                Hospital
                            </MenuItem>
                            <MenuItem value={"OccupationalHealthcare"}>
                                OccupationalHealthcare
                            </MenuItem>
                        </Select>
                        {type !== "" ?
                            <>
                                <TextField label="description" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setDescription(e?.target?.value)} />
                                <TextField type='date' label="date" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setDate(e?.target?.value)} />
                                <TextField label="specialist" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setSpecialist(e?.target?.value)} />
                                <Select placeholder="diagnosisCodes" style={{ marginTop: 40 }} onChange={(e) => setDiagnosisCodes(e.target.value)}>
                                    {diagnosis?.map((diagnose: Diagnosis) => {
                                        return (
                                            <MenuItem value={diagnose.code}>{diagnose.code} {diagnose.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </>
                            : null
                        }

                        {type === "HealthCheck" ?
                            <>
                                <Select style={{ marginTop: 40 }} onChange={(e) => setHealthCheckRating(e.target.value)}>
                                    <MenuItem value={0}>
                                        Healthy
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        LowRisk
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        HighRisk
                                    </MenuItem>
                                    <MenuItem value={3}>
                                        CriticalRisk
                                    </MenuItem>
                                </Select>
                            </>
                            : null
                        }
                        {type === "Hospital" ?
                            <>
                                <TextField type='date' label="Discharge date" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setDischargeDate(e?.target?.value)} />
                                <TextField label="Discharge criteria" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setDischargeCriteria(e?.target?.value)} />
                            </>
                            : null
                        }
                        {type === "OccupationalHealthcare" ?
                            <>
                                <TextField label="employerName" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setEmployerName(e?.target?.value)} />
                                <TextField type='date' label="sickLeave startDate" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setSickLeaveStartDate(e?.target?.value)} />
                                <TextField type='date' label="sickLeave endDate" variant="outlined" style={{ paddingTop: 40 }} onChange={(e) => setSickLeaveEndDate(e?.target?.value)} />
                            </>
                            : null
                        }
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button style={{ marginTop: 20 }} variant="contained" type="submit" color="error" onClick={() => setEntryForm(false)}>Cancel</Button>
                            <Button style={{ marginTop: 20 }} variant="contained" type="submit" color="success" onClick={(e) => handleAdd(e)}>Add</Button>
                        </div>
                    </FormControl>
                </Paper>
            </Box>
        </div>
    )
}

export default EntryForm