import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosiservice from "../../services/diagnosis";

const PatientPage = (): JSX.Element => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  const id = useParams().id;

  useEffect(() => {
    const fetchPatientList = async () => {
      if (id) {
        setPatient(await patientService.get(id));
      }
      setDiagnosis(await diagnosiservice.getAll());
    };
    void fetchPatientList();
  }, [id]);

  return patient ? (
    <>
      <h3>{patient.name}</h3>
      {patient.ssn} {patient.dateOfBirth} {patient.gender}
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      <div>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <h4>{entry.date}</h4>
            <p>{entry.description}</p>
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
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <></>
  );
};

export default PatientPage;
