import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect, SyntheticEvent } from "react";
import patientService from "../../services/patients";
import diagnosiservice from "../../services/diagnosis";
import EntryDetails from "./EntryDetails";
import { NewEntry } from "../../types";

const PatientPage = (): JSX.Element => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  const [date, setDate] = useState("2024-04-21");
  const [description, setDescriptionn] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);

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

  const createEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(date);

    if (patient) {
      const newEntry: NewEntry = {
        type: "HealthCheck",
        date: date,
        description: description,
        specialist: specialist,
        healthCheckRating: healthCheckRating,
      };
      const addedEntry = await patientService.createEntry(patient.id, newEntry);
      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });
      console.log(addedEntry);
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
            <p>{entry.description}</p>
            <p>{entry.specialist}</p>
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
      <h4>New HealthCheckEntry</h4>
      <form onSubmit={createEntry}>
        <p>
          Date:&nbsp;
          <input
            size={14}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          ></input>
          &ensp;Specialist:&nbsp;
          <input
            value={specialist}
            size={25}
            onChange={(event) => setSpecialist(event.target.value)}
          ></input>
        </p>
        <p>
          Description:&nbsp;
          <input
            value={description}
            size={60}
            onChange={(event) => setDescriptionn(event.target.value)}
          ></input>
        </p>
        <p>
          CheckRating:&nbsp;
          <input
            value={healthCheckRating}
            size={4}
            type="number"
            onChange={(event) =>
              setHealthCheckRating(Number(event.target.value))
            }
          ></input>
        </p>
        <input type="submit" value="Add"></input>
      </form>
      <div></div>
    </>
  ) : (
    <></>
  );
};

export default PatientPage;
