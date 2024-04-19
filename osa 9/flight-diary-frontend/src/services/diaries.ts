import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `http://localhost:3000/api/diaries`
  );

  return data;
};

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

interface Result {
  ok: boolean;
  error: string;
}

const create = async (object: NewDiaryEntry): Promise<Result> => {
  try {
    await axios.post<NewDiaryEntry>(
      `http://localhost:3000/api/diaries`,
      object
    );
    return { ok: true, error: "" };
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      if (error.response) {
        return { ok: false, error: JSON.stringify(error.response.data) };
      }
      // Do something with this error...
      return { ok: false, error: "" };
    } else {
      return { ok: false, error: "" };
    }
  }
};

export default {
  getAll,
  create,
};
