import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";
import DiagnoseList from "./DiagnoseList";
import { Box, Typography } from "@mui/material";

const PatientPage = (): JSX.Element => {
  const [patient, setPatient] = useState<Patient>();

  const id = useParams().id;

  const fetchPatients = useCallback(async () => {
    if (id) {
      setPatient(await patientService.get(id));
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [id]);

  return patient ? (
    <>
      <Typography
        variant="h4"
        style={{ marginTop: "1.0em", marginBottom: "0.0em" }}
      >
        {patient.name}
      </Typography>

      {patient.ssn}
      <p>
        {patient.dateOfBirth} {patient.gender}
      </p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <div>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <Box
              borderTop={4}
              borderLeft={0}
              borderRight={0}
              borderColor="primary.main"
              borderRadius="4"
            >
              <h4>{entry.date}</h4>
              <p>Spec: {entry.specialist}</p>
              <p>Desc: {entry.description}</p>
              <p>
                <DiagnoseList diagnoses={entry.diagnosisCodes} />
              </p>
              <div>
                <p>
                  Details: <EntryDetails entry={entry}></EntryDetails>
                </p>
              </div>
            </Box>
          </div>
        ))}
      </div>

      <Typography
        variant="body1"
        style={{
          padding: "1.5em",
          borderBlock: "1.5em",
          backgroundColor: "lightgray",
          borderWidth: "1em",
        }}
      >
        <AddEntry patientId={patient.id} update={fetchPatients}></AddEntry>
      </Typography>
    </>
  ) : (
    <></>
  );
};

export default PatientPage;
