import axios from "axios";
import { Project } from "../../types";

export interface GetProjectInput {
  id: string;
}
export type GetProjectOutput = Project;

export const getTemplate = async ({
  id,
}: GetProjectInput): Promise<GetProjectOutput | null> => {
  try {
    const result = await axios.get(`/api/templates/${id}`);
    return result.data;
  } catch (e) {
    return null;
  }
};
