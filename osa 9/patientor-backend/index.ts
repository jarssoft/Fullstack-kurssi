import express from "express";
import cors from "cors";
import diagnoses from "./data/diagnoses";
import { getNonSensitiveEntries } from "./services/patientservice";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
