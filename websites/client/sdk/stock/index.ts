import axios from "axios";
import { StockResult } from "../../lib/sources";
import { MediaTabs } from "../../types";

export const getStock = async (
  type: MediaTabs,
  query?: string
): Promise<StockResult[] | null> => {
  try {
    const response = await axios.get(`/api/stock/`, {
      params: { type, query },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
