import axios from "axios";
import { Template } from "../../types";

export type UpdateTemplateInput = {
  id: string;
  template: Template;
};
export type UpdateTemplateOutput = Template;
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
