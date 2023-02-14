import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock } from "../../../../singleton";

test("Should fail if unauthorized", () =>
  testUnauthorized((c) => c.media.verify({ id: "adsf" })));
const id = "sdf";
const name = "test";
const type = "IMAGE";
test("Should fail if file doesnt exist", async () => {});
test("Should fail if file not uploaded", async () => {});
test("Success", async () => {});
