import { useState, SyntheticEvent } from "react";
import patientService from "../../services/patients";
import { NewEntry } from "../../types";
import Alert from "@mui/material/Alert";

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
  const [type, setType] = useState("HealthCheck");

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState("2012-04-21");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  //const [sickLeaveStart, setSickLeaveStart] = useState("2012-04-21");
  //const [sickLeaveEnd, setSickLeaveEnd] = useState("2012-04-21");
  //const [employerName, setEmployerName] = useState("");

  const [message, setMessage] = useState<string | undefined>("");

  const createEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(date);

    if (!isDate(date)) {
      setMessage("Incorrect value on date.");
      return;
    } else if (specialist.length < 1) {
      setMessage("Incorrect value on specialist.");
      return;
    } else {
      setMessage(undefined);

      let newEntry: NewEntry | undefined;

      switch (type) {
        case "HealthCheck":
          if (healthCheckRating < 0 || healthCheckRating > 3) {
            setMessage("Incorrect value on healtCheckRating.");
            return;
          }
          newEntry = {
            type: "HealthCheck",
            date: date,
            description: description,
            specialist: specialist,
            healthCheckRating: healthCheckRating,
          };
          break;

        case "Hospital":
          if (!isDate(dischargeDate) || dischargeCriteria.length == 0) {
            setMessage("Incorrect value on healtCheckRating.");
            return;
          }
          newEntry = {
            type: "Hospital",
            date: date,
            description: description,
            specialist: specialist,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          break;
      }

      if (newEntry) {
        const addedEntry = await patientService.createEntry(
          props.patientId,
          newEntry
        );
        props.update();
        console.log(addedEntry);
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

      //const [sickLeaveStart, setSickLeaveStart] = useState("2012-04-21");
      //const [sickLeaveEnd, setSickLeaveEnd] = useState("2012-04-21");
      //const [employerName, setEmployerName] = useState("");

      case "OccupationalHealthcare":
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
        {["HealthCheck", "Hospital", "OccupationalHealthcare"].map((t) => (
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
