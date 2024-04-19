import { NewDiaryEntry, Visibility, Weather } from "../types";
import { useState } from "react";

interface CreateProps {
  create: (nd: NewDiaryEntry) => void;
}

const empty: NewDiaryEntry = {
  date: "2024-04-19",
  visibility: Visibility.Great,
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
      date:
      <input
        type="date"
        value={newentry.date}
        onChange={(event) =>
          setNewentry({ ...newentry, date: event.target.value })
        }
      />
      <div>
        visibility:
        {Object.values(Visibility).map((v) => (
          <label key={v.toString()}>
            <input
              type="radio"
              name="visibility"
              checked={newentry.visibility == v}
              onChange={() => setNewentry({ ...newentry, visibility: v })}
            ></input>
            {v.toString()}
          </label>
        ))}
      </div>
      <div>
        weather:
        {Object.values(Weather).map((v) => (
          <label key={v.toString()}>
            <input
              type="radio"
              name="weather"
              key={v.toString()}
              checked={newentry.weather == v}
              onChange={() => setNewentry({ ...newentry, weather: v })}
            ></input>
            {v.toString()}
          </label>
        ))}
      </div>
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
