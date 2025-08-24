import { createTRPCRouter } from "../init";
import { subscriptionRouter } from "./subscription";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  user: userRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;
