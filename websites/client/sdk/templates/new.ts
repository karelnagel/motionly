import axios from "axios";
import { Project } from "../../types";

export type PostNewProjectInput = Project;
export type PostNewProjectOutput = Project;

export const postNewProject = async (
  input: PostNewProjectInput
): Promise<PostNewProjectOutput | null> => {
  try {
    const result = await axios.post(`/api/templates/new`, input);
    return result.data;
  } catch (e) {
    return null;
  }
};
