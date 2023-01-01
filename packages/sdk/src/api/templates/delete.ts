import { TemplateType } from "@asius/types";
import axios from "axios";
import { baseUrl } from "../../consts";
import { GetTemplateInput } from "./get";

export type DeleteTemplateInput = GetTemplateInput;
export type DeleteTemplateOutput = TemplateType;
export const deleteTemplate = async ({
  id,
}: DeleteTemplateInput): Promise<DeleteTemplateOutput | null> => {
  try {
    const result = await axios.delete(`${baseUrl}/api/templates/${id}`);
    return result.data;
  } catch (e) {
    return null;
  }
};
