import { useState, SyntheticEvent } from "react";
import {
  Entrytypes,
  NewBaseEntry,
  entryTypeList,
  ExtraEntry,
  Diagnosis,
} from "../../types";
import Alert from "@mui/material/Alert";
import OccupationalHealthcare from "./ExtraInputs/OccupationalHealthcare";
import Hospital from "./ExtraInputs/Hospital";
import HealthCheck from "./ExtraInputs/HealthCheck";
import patientService from "../../services/patients";
import DiagnoseList from "./DiagnoseList";
import { Button } from "@mui/material";

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
        diagnosisCodes: parseDiagnosis(diagnosis),
      };
    }
  };

  const parseDiagnosis = (diagnosis: string): Array<Diagnosis["code"]> => {
    return diagnosis
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);
  };

  const createEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const base = newBaseEntry();

    if (!extra) {
      setMessage("Error in extra information!");
      return;
    }

    if (base) {
      await patientService.createEntry(props.patientId, { ...base, ...extra });
      props.update();
      setMessage(undefined);
    }
  };

  return (
    <>
      <h4>New Entry</h4>

      {message ? (
        <Alert variant="outlined" severity="error">
          {message}
        </Alert>
      ) : (
        <></>
      )}

      <form onSubmit={createEntry}>
        <p>
          Date:&nbsp;
          <input
            size={14}
            value={date}
            type="date"
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
          <div>
            {diagnosis.length > 0 ? (
              <DiagnoseList diagnoses={parseDiagnosis(diagnosis)} />
            ) : (
              <i>For example Z57.1, Z74.3, M51.2...</i>
            )}
          </div>
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
        {type === "HealthCheck" ? <HealthCheck update={setExtra} /> : <></>}
        {type === "Hospital" ? <Hospital update={setExtra} /> : <></>}
        {type === "OccupationalHealthcare" ? (
          <OccupationalHealthcare update={setExtra} />
        ) : (
          <></>
        )}

        <Button variant="contained" onClick={createEntry}>
          Add
        </Button>
      </form>
    </>
  );
};

export default AddEntry;
