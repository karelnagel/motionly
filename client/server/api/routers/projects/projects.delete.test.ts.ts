import { testUnauthorized } from "../../testHelpers";
import { test } from "@jest/globals";
const input = {
  id: "123",
};
test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.projects.delete(input)));
test("Should fail if not owner", async () => {});
test("Should fail if doesnt exist", async () => {});
test("Should return the deleted project ", async () => {});
