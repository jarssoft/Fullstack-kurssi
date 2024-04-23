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
import Hospital from "./ExtraForms/Hospital";
import HealthCheck from "./ExtraForms/HealthCheck";

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
  const [extra, setExtra] = useState<ExtraEntry | undefined>();
  const [message, setMessage] = useState<string | undefined>("");

  const newBase = (): NewBaseEntry | undefined => {
    if (!isDate(date)) {
      setMessage("Incorrect value on date.");
      return undefined;
    } else if (specialist.length < 1) {
      setMessage("Incorrect value on specialist.");
      return undefined;
    } else {
      return {
        date: date,
        description: description,
        specialist: specialist,
        diagnosisCodes: diagnosis
          .split(",")
          .map((code) => code.trim())
          .filter((code) => code.length > 0),
      };
    }
  };

  const createEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const base = newBase();

    if (base && extra) {
      const entry = { ...base, ...extra };
      await patientService.createEntry(props.patientId, entry);
      props.update();
      setMessage(undefined);
    }
  };

  const extrainputs = (type: Entrytypes) => {
    switch (type) {
      case "HealthCheck":
        return (
          <HealthCheck setMessage={setMessage} update={setExtra}></HealthCheck>
        );
      case "Hospital":
        return <Hospital setMessage={setMessage} update={setExtra}></Hospital>;
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
