import { testUnauthorized } from "../../testHelpers";
import { test } from "@jest/globals";
const input = {
  id: "123",
  project: {
    name: "test",
    description: "test",
    preview: null,
    template: {
      width: 100,
      height: 100,
      duration: 10,
      fps: 10,
      childIds: [],
    },
  },
};
test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.projects.update(input)));
test("Should fail if not owner", async () => {});
test("Should fail if doesnt exist", async () => {});
test("Should return the project and render new preview", async () => {});
