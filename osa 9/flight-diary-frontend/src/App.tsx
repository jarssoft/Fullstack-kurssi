import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";
import Entry from "./controllers/Entry";
import Create from "./controllers/Create";
import diaryservices from "./services/diaries";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await diaryservices.getAll();
      setEntries(patients);
    };
    void fetchPatientList();
  }, []);

  const noteCreation = (newentry: NewDiaryEntry) => {
    diaryservices.create(newentry);
    setEntries(entries.concat({ ...newentry, id: entries.length + 1 }));
  };

  return (
    <>
      <Create create={noteCreation}></Create>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
}

export default App;
