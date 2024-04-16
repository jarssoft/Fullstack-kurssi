import patients from "../data/patients";
import { PatientWithoutSSN } from "../types";
import { NewPatient, Patient } from "../types";
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
