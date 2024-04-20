import { Entrytypes, Entry } from "../../types";

const EntryDetails = (entry: { entry: Entry }): JSX.Element => {
  switch (entry.entry.type) {
    case "Hospital":
      return (
        <>
          Discharge:&nbsp;{entry.entry.discharge.date}{" "}
          {entry.entry.discharge.criteria}
        </>
      );
    case "HealthCheck":
      return <>CheckRating:&nbsp;{entry.entry.healthCheckRating}</>;
    case "OccupationalHealthcare":
      return (
        <>
          Employer:&nbsp;
          {entry.entry.employerName}&nbsp;
          {entry.entry.sickLeave
            ? entry.entry.sickLeave?.startDate +
              "–" +
              entry.entry.sickLeave?.endDate
            : ""}
        </>
      );
    default:
      return <>ERROR</>;
  }
};

export default EntryDetails;
