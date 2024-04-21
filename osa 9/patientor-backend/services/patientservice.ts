import patients from "../data/patients";
import { PatientWithoutSSN } from "../types";
import { NewPatient, NewEntry, Patient, Entry } from "../types";
import { v1 as uuid } from "uuid";

export const getNonSensitiveEntries = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (entry: NewPatient): Patient => {
  const newDiaryEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newDiaryEntry);
  return newDiaryEntry;
};

export const addEntry = (id: string, entry: NewEntry): Entry => {
  const newDiaryEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  console.log(id);

  const patient = patients.find((patient) => patient.id == id);

  if (patient) {
    patient.entries.push(newDiaryEntry);
  }
  return newDiaryEntry;
};
