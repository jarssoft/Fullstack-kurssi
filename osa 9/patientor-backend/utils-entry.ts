import { NewEntry, Diagnosis } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

//const isHospital = (param: string): param is "Hospital" => {
//  return ["Hospital"].includes(param);
//};

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
      "diagnosisCodes" in object &&
      "description" in object &&
      isString(object.description)
    )
  ) {
    throw new Error(
      "Incorrect data parsing BaseEntry: some fields are missing"
    );
  }

  if (object.type == "Hospital") {
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
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      description: object.description,
      discharge: {
        date: object.discharge.date,
        criteria: object.discharge.criteria,
      },
    };
  }
  throw new Error("Incorrect data: no corret type field.");
};

export default toNewEntry;
