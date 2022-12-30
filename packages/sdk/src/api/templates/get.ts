import { TemplateType } from "@asius/types";
import axios from "axios";
import { BASE_URL } from "../../consts";

export interface GetTemplateInput {
  id: string;
}
export type GetTemplateOutput = TemplateType;

export const getTemplate = async ({
  id,
}: GetTemplateInput): Promise<GetTemplateOutput | null> => {
  try {
    const result = await axios.get(`${BASE_URL}/api/templates/${id}`);
    return result.data;
  } catch (e) {
    return null;
  }
};
