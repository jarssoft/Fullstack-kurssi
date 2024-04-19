import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";
import Entry from "./controllers/Entry";
import Create from "./controllers/Create";
import diaryservices from "./services/diaries";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const loadedEntries = await diaryservices.getAll();
        setEntries(loadedEntries);
      } catch {
        setMessage("Error! Cannot load entries!");
      }
    };
    void fetchPatientList();
  }, []);

  const noteCreation = async (newentry: NewDiaryEntry) => {
    const res = await diaryservices.create(newentry);
    if (res.ok) {
      setMessage("");
      setEntries(entries.concat({ ...newentry, id: entries.length + 1 }));
    } else {
      setMessage(res.error);
    }
  };

  return (
    <>
      <b style={{ color: "red" }}>{message}</b>
      <h3>Add entry</h3>
      <Create create={noteCreation}></Create>
      <h3>Diary</h3>
      <table>
        {entries.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </table>
    </>
  );
}

export default App;
