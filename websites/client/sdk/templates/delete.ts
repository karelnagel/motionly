import axios from "axios";
import { Project } from "../../types";
import { GetProjectInput } from "./get";

export type DeleteProjectInput = GetProjectInput;
export type DeleteProjectOutput = Project;
export const deleteProject = async ({
  id,
}: DeleteProjectInput): Promise<DeleteProjectOutput | null> => {
  try {
    const result = await axios.delete(`/api/templates/${id}`);
    return result.data;
  } catch (e) {
    return null;
  }
};
