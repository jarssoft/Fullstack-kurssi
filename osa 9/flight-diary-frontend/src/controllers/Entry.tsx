import { NonSensitiveDiaryEntry } from "../types";

interface EntryProps {
  entry: NonSensitiveDiaryEntry;
}

const Entry = (props: EntryProps) => {
  return (
    <tr>
      <th>{props.entry.date}</th>
      <td>{props.entry.visibility}</td>
      <td>{props.entry.weather}</td>
    </tr>
  );
};

export default Entry;
