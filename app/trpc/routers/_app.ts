import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: "hello",
    };
  }),
  whoami: protectedProcedure.query(({ ctx }) => {
    return { id: ctx.user.id, email: ctx.user.email };
  }),
  getPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany();
    return posts;
  }),
});

export type AppRouter = typeof appRouter;
