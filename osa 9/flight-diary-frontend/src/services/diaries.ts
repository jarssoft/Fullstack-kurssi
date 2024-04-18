import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `http://localhost:3000/api/diaries`
  );

  return data;
};

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<NewDiaryEntry>(
    `http://localhost:3000/api/diaries`,
    object
  );
  return data;
};

export default {
  getAll,
  create,
};
