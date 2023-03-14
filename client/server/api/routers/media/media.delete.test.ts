import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";

test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.media.delete({ id: "sdf" })));
test("Should fail if no fail", async () => {});
test("Should fail if not owner", async () => {});
test("Should return deleted file", async () => {});
