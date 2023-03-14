import { testUnauthorized } from "../../testHelpers";
import { test } from "@jest/globals";

const input = {
  template: {
    width: 100,
    height: 100,
    duration: 10,
    fps: 10,
    childIds: [],
  },
  frame: 10,
  id: "",
};

test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.renders.still(input)));
test("Should render still", async () => {});
