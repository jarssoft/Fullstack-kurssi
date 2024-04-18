import { NewDiaryEntry, Visibility, Weather } from "../types";
import { useState } from "react";

interface CreateProps {
  create: (nd: NewDiaryEntry) => void;
}

const Create = (props: CreateProps) => {
  const [newentry, setNewentry] = useState<NewDiaryEntry>({
    date: "",
    visibility: Visibility.Good,
    weather: Weather.Rainy,
    comment: "",
  });

  const create = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newentry);
    props.create(newentry);
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