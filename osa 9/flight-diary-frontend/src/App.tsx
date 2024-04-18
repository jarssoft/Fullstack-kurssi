import { useState, useEffect } from "react";
import { Visibility, Weather, NonSensitiveDiaryEntry } from "./types";
import Entry from "./controllers/Entry";
import Create from "./controllers/Create";
import patientservices from "./services/patients";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([
    {
      id: 1,
      date: "2017-01-01",
      weather: Weather.Rainy,
      visibility: Visibility.Poor,
    },
  ]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientservices.getAll();
      setEntries(patients);
      console.log(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <>
      <Create></Create>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
}

export default App;
