import { testUnauthorized } from "../../testHelpers";
import { test } from "@jest/globals";

test("Should fail if not authorized", () =>
  testUnauthorized((c) => c.renders.getAll({})));
test("Should return counts,return renders and update progress", async () => {});
