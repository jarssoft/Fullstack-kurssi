import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosiservice from "../../services/diagnosis";
import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";

const PatientPage = (): JSX.Element => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  const id = useParams().id;

  useEffect(() => {
    const fetchPatientList = async () => {
      update();
      setDiagnosis(await diagnosiservice.getAll());
    };
    void fetchPatientList();
  }, [id]);

  const update = async () => {
    if (id) {
      setPatient(await patientService.get(id));
    }
  };

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
            <p>Desc: {entry.description}</p>
            <p>Spec: {entry.specialist}</p>
            <div>
              {entry.diagnosisCodes
                ? entry.diagnosisCodes.map((code) => (
                    <span key={code}>
                      {code}&nbsp;
                      {diagnosis
                        ? diagnosis
                            .filter((diagnose) => diagnose.code == code)
                            .map((diagnose) => (
                              <span key={diagnose.code}>{diagnose.name}, </span>
                            ))
                        : ""}
                    </span>
                  ))
                : ""}
              <p>
                Details: <EntryDetails entry={entry}></EntryDetails>
              </p>
            </div>
          </div>
        ))}
      </div>

      <AddEntry patientId={patient.id} update={update}></AddEntry>
    </>
  ) : (
    <></>
  );
};

export default PatientPage;
