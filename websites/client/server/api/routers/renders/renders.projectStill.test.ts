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

test("Should add watermark if not authorized", () => {});
test("Should fail if no project", async () => {});
test("Should fail if not project owner", async () => {});
test("Should fail if project not public", async () => {});
