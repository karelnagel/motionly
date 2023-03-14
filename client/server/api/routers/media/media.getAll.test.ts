import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";

test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.media.getAll({})));
test("Success", async () => {});
