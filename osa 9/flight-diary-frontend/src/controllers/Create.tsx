import { NewDiaryEntry, Visibility, Weather } from "../types";
import { useState } from "react";

//interface CreateProps {
//entry: NewDiaryEntry;
//}

const Create = () => {
  const [entry, setEntry] = useState<NewDiaryEntry>({
    date: "",
    visibility: Visibility.Good,
    weather: Weather.Rainy,
    comment: "",
  });

  const create = () => {
    setEntry(entry);
  };

  return (
    <form onSubmit={create}>
      <h3>Add entry</h3>
      <ul>
        <input value={entry.date}></input>
        <input value={entry.visibility}></input>
        <input value={entry.weather}></input>
        <button>Add</button>
      </ul>
    </form>
  );
};

export default Create;
