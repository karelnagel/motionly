import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";

test("getAll UNAUTHORIZED", () => testUnauthorized((c) => c.media.getAll({})));
test("new UNAUTHORIZED", () =>
  testUnauthorized((c) => c.media.new({ name: "asdf", type: "IMAGE" })));
test("delete UNAUTHORIZED", () =>
  testUnauthorized((c) => c.media.delete({ id: "sdf" })));
test("verify UNAUTHORIZED", () =>
  testUnauthorized((c) => c.media.verify({ id: "adsf" })));
test("get UNAUTHORIZED", () =>
  testUnauthorized((c) => c.media.get({ id: "adsf" })));
test("youtube UNAUTHORIZED", () =>
  testUnauthorized((c) =>
    c.media.youtube({ youtubeUrl: "https://youtube.com/" })
  ));
