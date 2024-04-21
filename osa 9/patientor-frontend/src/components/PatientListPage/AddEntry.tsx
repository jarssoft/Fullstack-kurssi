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
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [message, setMessage] = useState<string | undefined>("");

  const createEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(date);

    if (healthCheckRating < 0 || healthCheckRating > 3) {
      setMessage("Incorrect value on healtCheckRating.");
      return;
    } else if (!isDate(date)) {
      setMessage("Incorrect value on date.");
      return;
    } else if (specialist.length < 1) {
      setMessage("Incorrect value on specialist.");
      return;
    } else {
      setMessage(undefined);

      const newEntry: NewEntry = {
        type: "HealthCheck",
        date: date,
        description: description,
        specialist: specialist,
        healthCheckRating: healthCheckRating,
      };
      const addedEntry = await patientService.createEntry(
        props.patientId,
        newEntry
      );

      props.update();
      console.log(addedEntry);
    }
  };

  return (
    <>
      <h4>New HealthCheckEntry</h4>

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
        <input type="submit" value="Add"></input>
      </form>
    </>
  );
};

export default AddEntry;
