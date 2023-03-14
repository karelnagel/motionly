import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "./server/db";
import { s3, transcribe } from "./lib/aws";
jest.mock("./server/db", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));
jest.mock("./lib/aws", () => ({
  _esModule: true,
  s3: mockDeep<typeof s3>(),
  transcribe: mockDeep<typeof transcribe>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
  mockReset(s3Mock);
  mockReset(transcribeMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
export const s3Mock = s3 as unknown as DeepMockProxy<typeof s3>;
export const transcribeMock = transcribe as unknown as DeepMockProxy<
  typeof transcribe
>;
