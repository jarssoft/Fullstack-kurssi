import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `http://localhost:3000/api/diaries`
  );

  return data;
};

/*const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};
*/
export default {
  getAll,
  //create,
};
