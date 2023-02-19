import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";
const input = {
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
};
test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.projects.new(input)));
test("Should return new project", async () => {});
