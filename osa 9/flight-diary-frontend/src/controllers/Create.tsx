import { NewDiaryEntry, Visibility, Weather } from "../types";
import { useState } from "react";

interface CreateProps {
  create: (nd: NewDiaryEntry) => void;
}

const empty: NewDiaryEntry = {
  date: "",
  visibility: Visibility.Ok,
  weather: Weather.Sunny,
  comment: "",
};

const Create = (props: CreateProps) => {
  const [newentry, setNewentry] = useState<NewDiaryEntry>(empty);

  const create = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.create(newentry);
    //setNewentry(empty);
  };

  return (
    <form onSubmit={create}>
      <h3>Add entry</h3>
      date:
      <input
        value={newentry.date}
        onChange={(event) =>
          setNewentry({ ...newentry, date: event.target.value })
        }
      />
      visibility:
      <input
        value={newentry.visibility}
        onChange={(event) =>
          setNewentry({
            ...newentry,
            visibility: event.target.value as Visibility,
          })
        }
      />
      weather:
      <input
        value={newentry.weather}
        onChange={(event) =>
          setNewentry({ ...newentry, weather: event.target.value as Weather })
        }
      />
      comment:
      <input
        value={newentry.comment}
        onChange={(event) =>
          setNewentry({ ...newentry, comment: event.target.value })
        }
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Create;
