import axios from "axios";
import { Template } from "../../types";

export type PostNewTemplateInput = Template;
export type PostNewTemplateOutput = Template;

export const postNewTemplate = async (
  input: PostNewTemplateInput
): Promise<PostNewTemplateOutput | null> => {
  try {
    const result = await axios.post(`/api/templates/new`, input);
    return result.data;
  } catch (e) {
    return null;
  }
};
