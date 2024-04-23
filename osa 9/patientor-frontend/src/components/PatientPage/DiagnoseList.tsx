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
      {props.diagnoses && diagnosis ? (
        props.diagnoses.map((code) => (
          <span key={code}>
            <b>{code}</b>&nbsp;
            {diagnosis
              .filter((diagnose) => diagnose.code == code)
              .map((diagnose) => (
                <span key={diagnose.code}>{diagnose.name}, </span>
              ))}
          </span>
        ))
      ) : (
        <>No diagnoses</>
      )}
    </>
  );
};

export default DiagnoseList;
