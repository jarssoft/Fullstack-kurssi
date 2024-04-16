import express from "express";
import cors from "cors";
import diagnoses from "./data/diagnoses";
import { getNonSensitiveEntries, addPatient } from "./services/patientservice";

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

app.post("/api/patients", (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = addPatient({ name, dateOfBirth, ssn, gender, occupation });
  res.json(addedEntry);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
