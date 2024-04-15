import express from "express";
import calculateBmi from "./bmiCalculator";
import { parseArguments } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

interface Exercises {
  daily_exercises: number[];
  target: number;
}

app.get("/bmi", (req, res) => {
  if (req.query.weight && req.query.height) {
    try {
      const { value1, value2 } = parseArguments([
        "",
        "",
        req.query.height as string,
        req.query.weight as string,
      ]);
      res.send({
        height: req.query.height as string,
        weight: req.query.weight as string,
        bmi: calculateBmi(value1, value2),
      });
    } catch (error: unknown) {
      res.send({
        error: "malformatted parameters",
      });
    }
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = request.body as Exercises;
  response.json(calculateExercises(body.daily_exercises, body.target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
