import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";

test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.media.youtube({ youtubeUrl: "adsf" })));
test("Should fail if invalid url", async () => {});
test("Success", async () => {});
