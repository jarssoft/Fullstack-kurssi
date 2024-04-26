import { useState, useEffect } from "react";
import { OccupationalHealthcareExtra } from "../../../types";

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  update: (extra: OccupationalHealthcareExtra | undefined) => void;
}

const OccupationalHealthcare = (props: Props): JSX.Element => {
  const [employerName, setEmployerName] = useState("");
  const [hasSickLeave, setHasSickLeave] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState("2012-04-21");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("2012-04-21");

  useEffect(() => {
    const newExtra = (): OccupationalHealthcareExtra | undefined => {
      if (employerName.length == 0) {
        return;
      }
      if (hasSickLeave && (!isDate(sickLeaveStart) || !isDate(sickLeaveEnd))) {
        return;
      }
      return {
        type: "OccupationalHealthcare",
        employerName: employerName,
        sickLeave: hasSickLeave
          ? {
              startDate: sickLeaveStart,
              endDate: sickLeaveEnd,
            }
          : undefined,
      };
    };
    props.update(newExtra());
  }, [employerName, hasSickLeave, sickLeaveStart, sickLeaveEnd, props]);

  return (
    <>
      <p>
        EmployerName:&nbsp;
        <input
          value={employerName}
          size={20}
          onChange={(event) => setEmployerName(event.target.value)}
        ></input>
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            id="hasSickLeave"
            name="hasSickLeave"
            checked={hasSickLeave}
            onChange={(event) => setHasSickLeave(event.target.checked)}
          />
          &nbsp;sickLeave:
        </label>
        &nbsp;
        <input
          value={sickLeaveStart}
          size={20}
          type="date"
          disabled={!hasSickLeave}
          onChange={(event) => setSickLeaveStart(event.target.value)}
        ></input>
        &nbsp;–&nbsp;
        <input
          value={sickLeaveEnd}
          size={20}
          type="date"
          disabled={!hasSickLeave}
          onChange={(event) => setSickLeaveEnd(event.target.value)}
        ></input>
      </p>
    </>
  );
};

export default OccupationalHealthcare;
