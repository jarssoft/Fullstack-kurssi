import { useState, useEffect } from "react";
import { HealthCheckExtra } from "../../../types";

interface Props {
  update: (extra: HealthCheckExtra | undefined) => void;
}

const HealthCheck = (props: Props): JSX.Element => {
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const newExtra = (): HealthCheckExtra | undefined => {
    if (healthCheckRating < 0 || healthCheckRating > 3) {
      return;
    }

    return {
      type: "HealthCheck",
      healthCheckRating: healthCheckRating,
    };
  };

  useEffect(() => {
    props.update(newExtra());
  }, [healthCheckRating]);

  return (
    <p>
      CheckRating:&nbsp;
      <input
        value={healthCheckRating}
        size={4}
        type="number"
        onChange={(event) => setHealthCheckRating(Number(event.target.value))}
      ></input>
    </p>
  );
};

export default HealthCheck;
