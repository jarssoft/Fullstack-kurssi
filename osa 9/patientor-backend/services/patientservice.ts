import patients from "../data/patients";

import { PatientWithoutSSN } from "../types";

export const getNonSensitiveEntries = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
