import axios from "axios";
import { Template } from "../../types";
import { GetTemplateInput } from "./get";

export type DeleteTemplateInput = GetTemplateInput;
export type DeleteTemplateOutput = Template;
export const deleteTemplate = async ({
  id,
}: DeleteTemplateInput): Promise<DeleteTemplateOutput | null> => {
  try {
    const result = await axios.delete(`/api/templates/${id}`);
    return result.data;
  } catch (e) {
    return null;
  }
};
