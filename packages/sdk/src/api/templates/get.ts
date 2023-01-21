import { TemplateType } from "@asius/base";
import axios from "axios";
import { baseUrl } from "../../consts";

export interface GetTemplateInput {
  id: string;
}
export type GetTemplateOutput = TemplateType;

export const getTemplate = async ({
  id,
}: GetTemplateInput): Promise<GetTemplateOutput | null> => {
  try {
    const result = await axios.get(`${baseUrl}/api/templates/${id}`);
    return result.data;
  } catch (e) {
    return null;
  }
};
