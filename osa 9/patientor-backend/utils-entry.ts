import { NewEntry, Diagnosis } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !(
      "date" in object &&
      isString(object.date) &&
      "type" in object &&
      isString(object.type) &&
      "specialist" in object &&
      isString(object.specialist) &&
      "description" in object &&
      isString(object.description)
    )
  ) {
    throw new Error(
      "Incorrect data parsing BaseEntry: some fields are missing"
    );
  }

  switch (object.type) {
    case "Hospital":
      if (!("discharge" in object)) {
        throw new Error("Incorrect data: discharge is missing");
      }
      if (
        !(
          object.discharge &&
          typeof object.discharge === "object" &&
          "date" in object.discharge &&
          isString(object.discharge.date) &&
          "criteria" in object.discharge &&
          isString(object.discharge.criteria)
        )
      ) {
        throw new Error("Incorrect data: discharge fields are missing");
      }

      return {
        date: object.date,
        type: object.type,
        specialist: object.specialist,
        diagnosisCodes:
          "diagnosisCodes" in object
            ? parseDiagnosisCodes(object.diagnosisCodes)
            : [],
        description: object.description,
        discharge: {
          date: object.discharge.date,
          criteria: object.discharge.criteria,
        },
      };

    case "HealthCheck":
      if (!("healthCheckRating" in object)) {
        throw new Error("Incorrect data: healthCheckRating is missing");
      }
      if (!isNumber(object.healthCheckRating)) {
        throw new Error("Incorrect data: healthCheckRating fields are missing");
      }

      return {
        date: object.date,
        type: object.type,
        specialist: object.specialist,
        diagnosisCodes:
          "diagnosisCodes" in object
            ? parseDiagnosisCodes(object.diagnosisCodes)
            : [],
        description: object.description,
        healthCheckRating: object.healthCheckRating,
      };

    case "OccupationalHealthcare":
      if (!("employerName" in object)) {
        throw new Error("Incorrect data: employerName is missing");
      }
      if (!isString(object.employerName)) {
        throw new Error("Incorrect data: employerName fields are missing");
      }
      return {
        ...object,
        date: object.date,
        type: object.type,
        specialist: object.specialist,
        diagnosisCodes:
          "diagnosisCodes" in object
            ? parseDiagnosisCodes(object.diagnosisCodes)
            : [],
        description: object.description,
        employerName: object.employerName,
      };
  }

  throw new Error("Incorrect data: no corret type-field.");
};

export default toNewEntry;
