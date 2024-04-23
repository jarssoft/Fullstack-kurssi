import { Gender, NewPatient } from "./types";

// type predicates

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

// safe parsing

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect dateOfBirth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (Gender: unknown): Gender => {
  if (!isString(Gender) || !isGender(Gender)) {
    throw new Error("Incorrect Gender: " + Gender);
  }
  return Gender;
};

const parseName = (Name: unknown): string => {
  if (!isString(Name)) {
    throw new Error("Incorrect Name: " + Name);
  }
  return Name;
};

const parseOccupation = (Occupation: unknown): string => {
  if (!isString(Occupation)) {
    throw new Error("Incorrect Occupation: " + Occupation);
  }
  return Occupation;
};

const parseSSN = (SSN: unknown): string => {
  if (!isString(SSN)) {
    throw new Error("Incorrect SSN: " + SSN);
  }
  return SSN;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "dateOfBirth" in object &&
    "gender" in object &&
    "name" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newEntry: NewPatient = {
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;
