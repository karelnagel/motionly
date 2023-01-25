import { TemplateType } from "@motionly/base";
import axios from "axios";

export type PostNewTemplateInput = TemplateType;
export type PostNewTemplateOutput = TemplateType;

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
