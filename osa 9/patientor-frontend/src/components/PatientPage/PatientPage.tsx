import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";
import DiagnoseList from "./DiagnoseList";

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
      <h2>{patient.name}</h2>
      {patient.ssn}
      <p>
        {patient.dateOfBirth} {patient.gender}
      </p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <div>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
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
          </div>
        ))}
      </div>

      <AddEntry patientId={patient.id} update={fetchPatients}></AddEntry>
    </>
  ) : (
    <></>
  );
};

export default PatientPage;
