import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";
import { test } from "@jest/globals";
import { prismaMock, s3Mock } from "../../../../singleton";

test("new UNAUTHORIZED", () =>
  testUnauthorized((c) => c.media.new({ name: "asdf", type: "IMAGE" })));

test("Wrong media types", () => {
  const caller = authorizedCaller();
  expect(() =>
    caller.media.new({ name: "asdf", type: "asdf" })
  ).rejects.toThrow("Invalid media type");
});

test("success", async () => {
  const caller = authorizedCaller();
  prismaMock.file.create.mockResolvedValue({
    id: "sdf",
    name: "test",
    type: "image/png",
    userId,
  } as any);
  s3Mock.getSignedUrlPromise.mockResolvedValue("https://s3.amazonaws.com");
  const { id, signedUrl } = await caller.media.new({
    name: "test",
    type: "image/png",
  });
  expect(prismaMock.file.create).toHaveBeenCalledWith({
    data: { name: "test", type: "IMAGE", userId },
  });
  expect(s3Mock.getSignedUrlPromise).toHaveBeenCalledWith("putObject", {
    Bucket: "motionly-media",
    Key: `${userId}/sdf`,
    Expires: 60 * 60 * 24,
    ContentType: "image/png",
  });

  expect(id).toBe("sdf");
  expect(signedUrl).toContain("s3.amazonaws.com");
});
