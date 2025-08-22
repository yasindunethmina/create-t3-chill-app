import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  marketsAll: baseProcedure.query(async ({ ctx }) => {
    return ctx.prisma.markets.findMany();
  }),
  notesCreate: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.notes.create({ data: { title: input.title } });
    }),
  whoami: protectedProcedure.query(({ ctx }) => {
    return { id: ctx.user.id, email: ctx.user.email };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;