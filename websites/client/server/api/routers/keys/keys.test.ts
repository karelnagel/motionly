import { test } from "@jest/globals";
import { hashString } from "../../../../helpers/hash";
import { prismaMock } from "../../../../singleton";
import { authorizedCaller, testUnauthorized, userId } from "../../testHelpers";

test("new UNAUTHORIZED", () =>
  testUnauthorized((c) => c.keys.new({ name: "adsf" })));
test("delete UNAUTHORIZED", () =>
  testUnauthorized((c) => c.keys.delete({ hash: "sdf" })));
test("getAll UNAUTHORIZED", () => testUnauthorized((c) => c.keys.getAll({})));

test("new", async () => {
  const caller = authorizedCaller();
  prismaMock.apiKey.create.mockResolvedValue({
    name: "test",
    hash: "asdf",
    userId,
  } as any);
  const { key, secret } = await caller.keys.new({ name: "test" });
  expect(prismaMock.apiKey.create).toHaveBeenCalledWith({
    data: { hash: hashString(secret), name: "test", userId },
  });
  expect(key.name).toBe("test");
  expect(key.hash).toBe("asdf");
  expect(key.userId).toBe(userId);
  expect(secret).toHaveLength(36);
});

test("getAll", async () => {
  const caller = authorizedCaller();
  prismaMock.apiKey.findMany.mockResolvedValue([
    { name: "test", hash: "asdf", userId },
  ] as any);
  const { keys } = await caller.keys.getAll({});
  expect(prismaMock.apiKey.findMany).toHaveBeenCalledWith({
    where: { userId },
  });
  expect(keys).toHaveLength(1);
  expect(keys[0].name).toBe("test");
  expect(keys[0].hash).toBe("asdf");
  expect(keys[0].userId).toBe(userId);
});

test("delete", async () => {
  const caller = authorizedCaller();
  prismaMock.apiKey.delete.mockResolvedValue({
    hash: "asdf",
    userId,
    name: "a",
  } as any);
  const key = await caller.keys.delete({ hash: "asdf" });
  expect(prismaMock.apiKey.delete).toHaveBeenCalledWith({
    where: { hash: "asdf" },
  });
  expect(key.name).toBe("a");
  expect(key.hash).toBe("asdf");
  expect(key.userId).toBe(userId);
});
