import { TranscriptionWord } from "@motionly/base";
import axios from "axios";

export const getTranscription = async (
  key: string
): Promise<{
  status: "COMPLETED" | "FAILED" | "IN_PROGRESS" | "QUEUED";
  transcription: TranscriptionWord[];
} | null> => {
  try {
    const result = await axios.get(`/api/media/transcriptions`, {
      params: { key },
    });
    return result.data;
  } catch (e) {
    return null;
  }
};
