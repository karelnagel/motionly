import { test, expect } from "@jest/globals";
import { TRPCError } from "@trpc/server";
import { MediaType } from "../../../../types";
import { authorizedCaller, unauthorizedCaller } from "../../testHelpers";
import { StockSources } from "./sources";

test("UNAUTHORIZED", async () => {
  const caller = unauthorizedCaller();
  expect(() => caller.stock.get({ type: "IMAGE" })).rejects.toThrow(TRPCError);
});

const testType = async (type: MediaType, query?: string) => {
  const caller = authorizedCaller();
  const images = await caller.stock.get({ type, query });
  StockSources.filter((s) => s.types.includes(type)).forEach((source) => {
    const result = images.results.find((result) => source.name === result.name);
    expect(result).toBeDefined();
    expect(result?.name).toBe(source.name);
    expect(result?.logo).toBe(source.logo);
    expect(result?.url).toBe(source.url);
    expect(result?.media.length).toBeGreaterThan(0);
    expect(result?.media.length).toBeLessThanOrEqual(query ? 21 : 9);
    result?.media.forEach((media) => {
      expect(media.type).toBe(type);
      expect(media.src).toContain("https://");
      expect(media.icon).toContain("https://");
    });
  });
};
test("IMAGE", async () => {
  await testType("IMAGE");
});
test("VIDEO", async () => {
  await testType("VIDEO");
});
test("AUDIO", async () => {
  await testType("AUDIO");
});
test("GIF", async () => {
  await testType("GIF");
});
test("IMAGE w query", async () => {
  await testType("IMAGE", "cat");
});
test("VIDEO w query", async () => {
  await testType("VIDEO", "cat");
});
test("AUDIO w query", async () => {
  await testType("AUDIO", "cat");
});
test("GIF w query", async () => {
  await testType("GIF", "cat");
});
