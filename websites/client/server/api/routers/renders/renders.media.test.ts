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
};

test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.renders.media(input)));
test("Should start rendering", async () => {});
