import CoursePart from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>{part.description}</div>
        </>
      );
    case "background":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <p>{part.description}</p>
            {part.backgroundMaterial}
          </div>
        </>
      );
    case "group":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>{part.groupProjectCount}</div>
        </>
      );
    case "special":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            {part.description}
            <ul>
              {part.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
        </>
      );
    default:
      return assertNever(part);
      break;
  }
};

export default Part;
