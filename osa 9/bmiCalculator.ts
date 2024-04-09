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
console.log(calculateBmi(180, 74));
