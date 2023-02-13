import { NextApiRequest, NextApiResponse } from "next";
import { openApiDocument } from "../../server/openapi";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  delete openApiDocument.components?.securitySchemes?.Authorization;

  openApiDocument.components!.securitySchemes!.api_key = {
    type: "apiKey",
    name: "X-API-KEY",
    in: "header",
  };
  const doc = JSON.parse(
    JSON.stringify(openApiDocument).replaceAll('"Authorization"', '"api_key"')
  );
  res.status(200).send(doc);
};

export default handler;
