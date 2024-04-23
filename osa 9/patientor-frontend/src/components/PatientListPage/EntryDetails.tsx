import { Entry } from "../../types";

const EntryDetails = (entry: { entry: Entry }): JSX.Element => {
  switch (entry.entry.type) {
    case "Hospital":
      return (
        <>
          Discharge&nbsp;at&nbsp;{entry.entry.discharge.date}
          &nbsp;Crit:&nbsp;{entry.entry.discharge.criteria}
        </>
      );

    case "HealthCheck":
      return <>CheckRating:&nbsp;{entry.entry.healthCheckRating}</>;

    case "OccupationalHealthcare":
      return (
        <>
          Empl:&nbsp;{entry.entry.employerName}&nbsp;
          {entry.entry.sickLeave ? (
            <>
              Leave:&nbsp;
              {entry.entry.sickLeave?.startDate}
              &nbsp;–&nbsp;
              {entry.entry.sickLeave?.endDate}
            </>
          ) : (
            <></>
          )}
        </>
      );

    default:
      return <>ERROR</>;
  }
};

export default EntryDetails;
