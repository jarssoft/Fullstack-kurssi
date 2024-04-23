import { useState, SyntheticEvent } from "react";
import {
  Entrytypes,
  NewBaseEntry,
  entryTypeList,
  ExtraEntry,
} from "../../types";
import Alert from "@mui/material/Alert";
import OccupationalHealthcare from "./ExtraInputs/OccupationalHealthcare";
import Hospital from "./ExtraInputs/Hospital";
import HealthCheck from "./ExtraInputs/HealthCheck";
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
  const [extra, setExtra] = useState<ExtraEntry | undefined>();
  const [message, setMessage] = useState<string | undefined>("");

  const newBaseEntry = (): NewBaseEntry | undefined => {
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
    const base = newBaseEntry();

    if (base && extra) {
      await patientService.createEntry(props.patientId, { ...base, ...extra });
      props.update();
      setMessage(undefined);
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
        {type === "HealthCheck" ? (
          <HealthCheck setMessage={setMessage} update={setExtra} />
        ) : (
          <></>
        )}
        {type === "Hospital" ? (
          <Hospital setMessage={setMessage} update={setExtra} />
        ) : (
          <></>
        )}
        {type === "OccupationalHealthcare" ? (
          <OccupationalHealthcare setMessage={setMessage} update={setExtra} />
        ) : (
          <></>
        )}
        <input type="submit" value="Add"></input>
      </form>
    </>
  );
};

export default AddEntry;
