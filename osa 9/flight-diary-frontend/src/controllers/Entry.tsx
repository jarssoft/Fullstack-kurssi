import { NonSensitiveDiaryEntry } from "../types";

interface EntryProps {
  entry: NonSensitiveDiaryEntry;
}

const Entry = (props: EntryProps) => {
  return (
    <div key={props.entry.id}>
      <h3>{props.entry.date}</h3>
      <ul>
        <li>{props.entry.visibility}</li>
        <li>{props.entry.weather}</li>
      </ul>
    </div>
  );
};

export default Entry;
