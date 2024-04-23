import { useState, SyntheticEvent } from "react";
import patientService from "../../services/patients";
import { NewEntry, Entrytypes, NewBaseEntry } from "../../types";
import Alert from "@mui/material/Alert";

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  patientId: string;
  update: () => void;
}

const types: Entrytypes[] = [
  "HealthCheck",
  "Hospital",
  "OccupationalHealthcare",
];

const AddEntry = (props: Props): JSX.Element => {
  const [date, setDate] = useState("2024-04-21");
  const [description, setDescriptionn] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [type, setType] = useState<Entrytypes>("HealthCheck");

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState("2012-04-21");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [hasSickLeave, setHasSickLeave] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState("2012-04-21");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("2012-04-21");

  const [message, setMessage] = useState<string | undefined>("");

  const newEntry = (): NewEntry | undefined => {
    if (!isDate(date)) {
      setMessage("Incorrect value on date.");
      return;
    } else if (specialist.length < 1) {
      setMessage("Incorrect value on specialist.");
      return;
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
          if (employerName.length == 0) {
            setMessage("Incorrect employer.");
            return;
          }
          if (
            hasSickLeave &&
            (!isDate(sickLeaveStart) || !isDate(sickLeaveEnd))
          ) {
            setMessage("Incorrect sickLeave time.");
            return;
          }
          return {
            ...base,
            type: "OccupationalHealthcare",
            employerName: employerName,
            sickLeave: hasSickLeave
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
          };
      }
    }
  };

  const createEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(date);

    const entry = newEntry();

    if (entry) {
      await patientService.createEntry(props.patientId, entry);
      props.update();
      setMessage(undefined);
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
          <>
            <p>
              EmployerName:&nbsp;
              <input
                value={employerName}
                size={20}
                onChange={(event) => setEmployerName(event.target.value)}
              ></input>
            </p>
            <p>
              <label>
                <input
                  type="checkbox"
                  id="hasSickLeave"
                  name="hasSickLeave"
                  checked={hasSickLeave}
                  onChange={(event) => setHasSickLeave(event.target.checked)}
                />
                &nbsp;sickLeave:
              </label>
              &nbsp;
              <input
                value={sickLeaveStart}
                size={20}
                disabled={!hasSickLeave}
                onChange={(event) => setSickLeaveStart(event.target.value)}
              ></input>
              &nbsp;–&nbsp;
              <input
                value={sickLeaveEnd}
                size={20}
                disabled={!hasSickLeave}
                onChange={(event) => setSickLeaveEnd(event.target.value)}
              ></input>
            </p>
          </>
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

        {types.map((t) => (
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
