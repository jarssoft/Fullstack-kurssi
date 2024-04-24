import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";
import DiagnoseList from "./DiagnoseList";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";

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

      <Typography
        variant="h5"
        style={{ marginTop: "1.0em", marginBottom: "0.0em" }}
      >
        Entries ({patient.entries.length})
      </Typography>

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
              <h4>
                {entry.type == "Hospital" ? (
                  <LocalHospitalIcon></LocalHospitalIcon>
                ) : entry.type == "HealthCheck" ? (
                  <CheckCircleIcon></CheckCircleIcon>
                ) : (
                  <WorkIcon></WorkIcon>
                )}
                &nbsp;
                {entry.date} {entry.specialist}
              </h4>

              <p>
                Desc: <i>{entry.description}</i>
              </p>
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
          padding: "0.5em",
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
