import express from "express";
import cors from "cors";
import diagnoses from "./data/diagnoses";
import { getNonSensitiveEntries, addPatient } from "./services/patientservice";
import toNewPatient from "./utils";
import patients from "./data/patients";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnoses);
});

app.get("/api/patients", (_req, res) => {
  res.send(getNonSensitiveEntries());
});

app.get("/api/patients/:id", (request, response) => {
  const id = request.params.id;
  const patient = patients.find((patient) => patient.id === id);
  response.json(patient);
});

app.post("/api/patients", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedEntry = addPatient(newPatient);
  res.json(addedEntry);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
