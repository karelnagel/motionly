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
};

test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.renders.still(input)));
test("Should fail if not file owner", async () => {});
test("Should fail if transcribing not started", async () => {});
test("Should get transcription progress", async () => {});
