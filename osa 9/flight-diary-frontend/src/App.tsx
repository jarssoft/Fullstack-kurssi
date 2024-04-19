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
      const patients = await diaryservices.getAll();
      setEntries(patients);
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
      <Create create={noteCreation}></Create>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
}

export default App;
