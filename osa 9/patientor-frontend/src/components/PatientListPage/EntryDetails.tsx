import { Entrytypes, Entry } from "../../types";

const EntryDetails = (entry: { entry: Entry }): JSX.Element => {
  switch (entry.entry.type) {
    case "Hospital":
      return (
        <p>
          Hospital
          <p>
            {entry.entry.discharge.date} {entry.entry.discharge.criteria}
          </p>
        </p>
      );
    case "HealthCheck":
      return (
        <p>
          HealthCheck<p>{entry.entry.healthCheckRating}</p>
        </p>
      );
    case "OccupationalHealthcare":
      return (
        <p>
          OccupationalHealthcare
          <li>{entry.entry.employerName}</li>
          {entry.entry.sickLeave ? (
            <li>
              {entry.entry.sickLeave?.startDate +
                "-" +
                entry.entry.sickLeave?.endDate}
            </li>
          ) : (
            ""
          )}
        </p>
      );
    default:
      return <>ERROR</>;
  }
};

export default EntryDetails;
