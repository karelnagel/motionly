import axios from "axios";
import { Project } from "../../types";

export type UpdateProjectInput = {
  id: string;
  project: Project;
};
export type UpdateProjectOutput = Project;
export const updateProject = async ({
  id,
  project,
}: UpdateProjectInput): Promise<UpdateProjectOutput | null> => {
  try {
    const result = await axios.put(`/api/templates/${id}`, project);
    return result.data;
  } catch (e) {
    return null;
  }
};
