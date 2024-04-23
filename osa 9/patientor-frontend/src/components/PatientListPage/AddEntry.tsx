import { useState, SyntheticEvent } from "react";

import {
  Entrytypes,
  NewBaseEntry,
  EntryTypeList as entryTypeList,
  ExtraEntry,
} from "../../types";
import Alert from "@mui/material/Alert";
import OccupationalHealthcareExtra from "./ExtraForms/OccupationalHealthcare";
import patientService from "../../services/patients";

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  patientId: string;
  update: () => void;
}

const AddEntry = (props: Props): JSX.Element => {
  const [date, setDate] = useState("2024-04-21");
  const [description, setDescriptionn] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [type, setType] = useState<Entrytypes>("HealthCheck");

  //const [base, setBase] = useState<NewBaseEntry | undefined>();
  const [extra, setExtra] = useState<ExtraEntry | undefined>();

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState("2012-04-21");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [message, setMessage] = useState<string | undefined>("");

  const newEntry = (): NewBaseEntry | undefined => {
    if (!isDate(date)) {
      setMessage("Incorrect value on date.");
      return undefined;
    } else if (specialist.length < 1) {
      setMessage("Incorrect value on specialist.");
      return undefined;
    } else {
      const base: NewBaseEntry = {
        date: date,
        description: description,
        specialist: specialist,
        diagnosisCodes: diagnosis
          .split(",")
          .map((code) => code.trim())
          .filter((code) => code.length > 0),
      };

      console.log(base);
      return base;
      //setBase(base);
      /*
      switch (type) {
        case "HealthCheck":
          if (healthCheckRating < 0 || healthCheckRating > 3) {
            setMessage("Incorrect value on healtCheckRating.");
            return;
          }

          return {
            ...base,
            type: "HealthCheck",
            healthCheckRating: healthCheckRating,
          };

        case "Hospital":
          if (!isDate(dischargeDate) || dischargeCriteria.length == 0) {
            setMessage("Incorrect value on discharge.");
            return;
          }
          return {
            ...base,
            type: "Hospital",
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };

        case "OccupationalHealthcare":
      }
      */
    }
  };

  const createEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    //console.log({ ...newEntry(), ...extra });
    //return;

    const base = newEntry();

    if (base && extra) {
      const entry = { ...base, ...extra };

      if (entry && base) {
        await patientService.createEntry(props.patientId, entry);
        props.update();
        setMessage(undefined);
      }
    }
  };

  const extrainputs = (type: string) => {
    switch (type) {
      case "HealthCheck":
        return (
          <p>
            CheckRating:&nbsp;
            <input
              value={healthCheckRating}
              size={4}
              type="number"
              onChange={(event) =>
                setHealthCheckRating(Number(event.target.value))
              }
            ></input>
          </p>
        );

      case "Hospital":
        return (
          <>
            <p>
              discharge date:&nbsp;
              <input
                value={dischargeDate}
                size={10}
                onChange={(event) => setDischargeDate(event.target.value)}
              ></input>
            </p>
            <p>
              criteria:&nbsp;
              <input
                value={dischargeCriteria}
                size={30}
                onChange={(event) => setDischargeCriteria(event.target.value)}
              ></input>
            </p>
          </>
        );

      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareExtra
            setMessage={setMessage}
            update={setExtra}
          ></OccupationalHealthcareExtra>
        );
    }
  };

  return (
    <>
      <h4>New Entry</h4>

      {message ? <Alert severity="error">{message}</Alert> : <></>}

      <form onSubmit={createEntry}>
        <p>
          Date:&nbsp;
          <input
            size={14}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          ></input>
          &ensp;Specialist:&nbsp;
          <input
            value={specialist}
            size={25}
            onChange={(event) => setSpecialist(event.target.value)}
          ></input>
        </p>
        <p>
          Description:&nbsp;
          <input
            value={description}
            size={60}
            onChange={(event) => setDescriptionn(event.target.value)}
          ></input>
        </p>
        <p>
          Diagnosis&nbsp;(comma-separated):&nbsp;
          <input
            value={diagnosis}
            size={40}
            onChange={(event) => setDiagnosis(event.target.value)}
          ></input>
        </p>

        {entryTypeList.map((t) => (
          <label>
            <input
              type="radio"
              name="type"
              value={t}
              checked={type == t}
              onChange={() => setType(t)}
            ></input>
            {t}
          </label>
        ))}
        {extrainputs(type)}
        <input type="submit" value="Add"></input>
      </form>
    </>
  );
};

export default AddEntry;
