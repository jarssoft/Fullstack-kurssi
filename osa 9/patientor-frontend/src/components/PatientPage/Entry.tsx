import { Entry } from "../../types";
import DiagnoseList from "./DiagnoseList";
import { Box } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props): JSX.Element => {
  const extras = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <>
            Discharge&nbsp;at&nbsp;{entry.discharge.date}
            &nbsp;Crit:&nbsp;{entry.discharge.criteria}
          </>
        );

      case "HealthCheck":
        return <>CheckRating:&nbsp;{entry.healthCheckRating}</>;

      case "OccupationalHealthcare":
        return (
          <>
            Empl:&nbsp;{entry.employerName}&nbsp;
            {entry.sickLeave ? (
              <>
                Leave:&nbsp;
                {entry.sickLeave?.startDate}
                &nbsp;–&nbsp;
                {entry.sickLeave?.endDate}
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

  return (
    <div key={entry.id}>
      <Box
        borderTop={4}
        borderLeft={0}
        borderRight={0}
        borderColor="primary.main"
        borderRadius="4"
      >
        <h4>
          {entry.type == "Hospital" ? (
            <LocalHospitalIcon></LocalHospitalIcon>
          ) : entry.type == "HealthCheck" ? (
            <CheckCircleIcon></CheckCircleIcon>
          ) : (
            <WorkIcon></WorkIcon>
          )}
          &nbsp;
          {entry.date} {entry.specialist}
        </h4>

        <p>
          Desc: <i>{entry.description}</i>
        </p>
        <p>
          <DiagnoseList diagnoses={entry.diagnosisCodes} />
        </p>
        <div>
          <p>Extra: {extras(entry)}</p>
        </div>
      </Box>
    </div>
  );
};

export default EntryDetails;
