export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Genrer {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Genrer;
  occupation: string;
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
