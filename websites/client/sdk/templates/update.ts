import { TemplateType } from "@asius/base";
import axios from "axios";

export type UpdateTemplateInput = {
  id: string;
  template: TemplateType;
};
export type UpdateTemplateOutput = TemplateType;
export const updateTemplate = async ({
  id,
  template,
}: UpdateTemplateInput): Promise<UpdateTemplateOutput | null> => {
  try {
    const result = await axios.put(`/api/templates/${id}`, template);
    return result.data;
  } catch (e) {
    return null;
  }
};
