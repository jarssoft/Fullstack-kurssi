import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";

const PatientPage = (): JSX.Element => {
  const [patient, setPatient] = useState<Patient>();

  const id = useParams().id;
  console.log(`ìd=${id}`);

  useEffect(() => {
    const fetchPatientList = async () => {
      if (id) {
        console.log(`ìd=${id}`);
        setPatient(await patientService.get(id));
      }
    };
    void fetchPatientList();
  }, [id]);

  return patient ? (
    <>
      <h3>{patient.name}</h3>
      {patient.ssn} {patient.dateOfBirth} {patient.gender}
      <p>occupation: {patient.occupation}</p>
      <p>entries: {patient.entries.length}</p>
    </>
  ) : (
    <></>
  );
};

export default PatientPage;
