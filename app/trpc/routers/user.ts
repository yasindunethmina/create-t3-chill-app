import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
  subscribedProcedure,
} from "../init";

export const userRouter = createTRPCRouter({
  // Test procedures
  hello: publicProcedure.query(() => {
    return {
      greeting: "hello",
    };
  }),

  // User procedures
  getProfile: authenticatedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findUnique({
      where: { id: ctx.user.id },
      include: {
        subscription: true,
      },
    });
    return profile;
  }),

  // Example: Subscription-only features (requires active subscription)
  getProFeatures: subscribedProcedure.query(async ({ ctx }) => {
    return {
      message: "🎉 Welcome to Pro! You have access to all premium features.",
      features: [
        "Advanced Analytics",
        "Priority Support",
        "Unlimited Projects",
        "Advanced Integrations",
      ],
      subscription: ctx.subscription,
    };
  }),
});
