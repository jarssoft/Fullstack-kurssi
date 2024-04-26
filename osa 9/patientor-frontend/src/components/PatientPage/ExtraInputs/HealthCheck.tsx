import { useState, useEffect } from "react";
import { HealthCheckExtra } from "../../../types";

interface Props {
  update: (extra: HealthCheckExtra | undefined) => void;
}

const HealthCheck = (props: Props): JSX.Element => {
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  useEffect(() => {
    const newExtra = (): HealthCheckExtra | undefined => {
      if (healthCheckRating < 0 || healthCheckRating > 3) {
        return;
      }

      return {
        type: "HealthCheck",
        healthCheckRating: healthCheckRating,
      };
    };

    props.update(newExtra());
  }, [healthCheckRating, props]);

  return (
    <p>
      CheckRating:&nbsp;
      <input
        value={healthCheckRating}
        size={4}
        type="number"
        min={0}
        max={3}
        onChange={(event) => setHealthCheckRating(Number(event.target.value))}
      ></input>
    </p>
  );
};

export default HealthCheck;
