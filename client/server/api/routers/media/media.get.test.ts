import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";

test("Should fail if unauthorized", () =>
  testUnauthorized((c) => c.media.get({ id: "adsf" })));
test("Should fail if file doesnt exist", async () => {});
test("Should fail if file if not owner", async () => {});
test("Should return file", async () => {});
