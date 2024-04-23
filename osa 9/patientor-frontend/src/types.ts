// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type Entrytypes = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

export const entryTypeList: Entrytypes[] = [
  "HealthCheck",
  "Hospital",
  "OccupationalHealthcare",
];

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  //type: Entrytypes;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckExtra {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalExtra {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareExtra {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type ExtraEntry =
  | HospitalExtra
  | HealthCheckExtra
  | OccupationalHealthcareExtra;

export interface HospitalEntry extends BaseEntry, HospitalExtra {}

export interface HealthCheckEntry extends BaseEntry, HealthCheckExtra {}

export interface OccupationalHealthcareEntry
  extends BaseEntry,
    OccupationalHealthcareExtra {}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NewEntry = UnionOmit<Entry, "id">;

//if type is not known
export type NewBaseEntry = UnionOmit<BaseEntry, "id" | "type">;
