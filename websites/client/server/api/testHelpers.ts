import { appRouter } from "./root";
import prisma from "../db";

export const userId = "asdfrty234cfvhadst546345175";

export const authorizedCaller = () => {
  return appRouter.createCaller({
    session: { user: { id: userId }, expires: "" },
    prisma,
  });
};
export const unauthorizedCaller = () => {
  return appRouter.createCaller({
    session: null,
    prisma,
  });
};

export const testUnauthorized = (
  func: (caller: ReturnType<typeof unauthorizedCaller>) => void
) => {
  const caller = unauthorizedCaller();
  expect(() => func(caller)).rejects.toThrow("UNAUTHORIZED");
};
