export interface TotalExercides {
  exerciseCount: number;
}

const Total = (props: TotalExercides) => {
  return <p>Number of exercises {props.exerciseCount}</p>;
};

export default Total;
