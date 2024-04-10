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
    success: average > target,
    rating: Math.floor((average / target) * 2) + 1,
    ratingDescription:
      ratinratingDescriptions[Math.floor((average / target) * 2)],
    target: target,
    average: average,
  };
};

const days = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

console.log(calculateExercises(days, target));
