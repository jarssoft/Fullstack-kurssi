interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / ((height / 100) * (height / 100));
  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  }
  if (bmi >= 18.5 && bmi <= 22.9) {
    return "Normal range (Healthy)";
  }
  if (bmi > 22.9 && bmi <= 24.9) {
    return "Overweight I (At risk)";
  }
  if (bmi > 24.9 && bmi <= 29.9) {
    return "Overweight II (Moderately obese)";
  }
  if (bmi > 29.9) {
    return "Overweight III (Severely obese)";
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
