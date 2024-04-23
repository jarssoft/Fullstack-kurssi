import { Diagnosis } from "../../types";
import { useEffect, useState } from "react";
import diagnosiservice from "../../services/diagnosis";

interface Props {
  diagnoses: Array<Diagnosis["code"]> | undefined;
}

const DiagnoseList = (props: Props): JSX.Element => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  useEffect(() => {
    (async () => {
      setDiagnosis(await diagnosiservice.getAll());
    })();
  }, []);

  return (
    <>
      {props.diagnoses ? (
        props.diagnoses.map((code) => (
          <span key={code}>
            <b>{code}</b>&nbsp;
            {diagnosis
              ? diagnosis
                  .filter((diagnose) => diagnose.code == code)
                  .map((diagnose) => (
                    <span key={diagnose.code}>{diagnose.name}, </span>
                  ))
              : ""}
          </span>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default DiagnoseList;
