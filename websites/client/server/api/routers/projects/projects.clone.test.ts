import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";
const input = {
  id: "123",
};
test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.projects.clone(input)));
test("Should fail if clone project doesnt exist", async () => {});
test("Should return new project", async () => {});
