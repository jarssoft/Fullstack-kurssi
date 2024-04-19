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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Genrer;
  occupation: string;
  entries: Entry[];
}

export type PatientWithoutSSN = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;
