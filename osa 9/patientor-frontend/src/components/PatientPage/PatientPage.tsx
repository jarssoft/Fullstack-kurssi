import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import patientService from "../../services/patients";
import EntryDetails from "./Entry";
import AddEntry from "./AddEntry";
import { Typography } from "@mui/material";

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
          <EntryDetails entry={entry}></EntryDetails>
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
