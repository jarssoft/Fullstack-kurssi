interface Exercises {
  target: number;
  days: number[];
}

const parseArgumentArray = (args: string[]): Exercises => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2]))) {
    let days = args.slice(3, 3 + args.length).map((day) => Number(day));
    if (days.findIndex((n) => Number.isNaN(n)) >= 0) {
      throw new Error("Provided values were not numbers!");
    }

    return {
      target: Number(args[2]),
      days,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratinratingDescriptions: string[] = ["you lazy", "not good", "OK"];

const calculateExercises = (days: number[], target: number): Result => {
  const average: number =
    days.reduce((total, hours) => total + hours, 0) / days.length;
  return {
    periodLength: days.length,
    trainingDays: days.reduce((total, hours) => total + (hours ? 1 : 0), 0),
    success: average >= target,
    rating: Math.floor((average / target) * 2) + 1,
    ratingDescription:
      ratinratingDescriptions[Math.floor((average / target) * 2)],
    target: target,
    average: average,
  };
};

try {
  const { days, target } = parseArgumentArray(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
