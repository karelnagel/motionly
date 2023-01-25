import { TemplateType } from "@motionly/base";
import axios from "axios";

export interface GetTemplateInput {
  id: string;
}
export type GetTemplateOutput = TemplateType;

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
