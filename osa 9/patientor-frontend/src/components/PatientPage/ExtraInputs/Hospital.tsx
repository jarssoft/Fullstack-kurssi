import { useState, useEffect } from "react";
import { HospitalExtra } from "../../../types";

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  update: (extra: HospitalExtra | undefined) => void;
}

const Hospital = (props: Props): JSX.Element => {
  const [dischargeDate, setDischargeDate] = useState("2012-04-21");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  useEffect(() => {
    const newExtra = (): HospitalExtra | undefined => {
      if (!isDate(dischargeDate) || dischargeCriteria.length == 0) {
        return;
      }
      return {
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      };
    };
    props.update(newExtra());
  }, [dischargeDate, dischargeCriteria, props]);

  return (
    <>
      <p>
        discharge date:&nbsp;
        <input
          value={dischargeDate}
          size={10}
          type="date"
          onChange={(event) => setDischargeDate(event.target.value)}
        ></input>
      </p>
      <p>
        criteria:&nbsp;
        <input
          value={dischargeCriteria}
          size={30}
          onChange={(event) => setDischargeCriteria(event.target.value)}
        ></input>
      </p>
    </>
  );
};

export default Hospital;
