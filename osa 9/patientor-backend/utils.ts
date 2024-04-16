import { Genrer, NewPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  console.log(object); // now object is no longer unused
  const newEntry: NewPatient = {
    dateOfBirth: "e",
    gender: Genrer.Male,
    name: "d",
    occupation: "ghh",
    ssn: "ffs",
  };

  return newEntry;
};

export default toNewPatient;
