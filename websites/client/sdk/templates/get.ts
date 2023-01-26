import axios from "axios";
import { Template } from "../../types";

export interface GetTemplateInput {
  id: string;
}
export type GetTemplateOutput = Template;

export const getTemplate = async ({
  id,
}: GetTemplateInput): Promise<GetTemplateOutput | null> => {
  try {
    const result = await axios.get(`/api/templates/${id}`);
    return result.data;
  } catch (e) {
    return null;
  }
};
