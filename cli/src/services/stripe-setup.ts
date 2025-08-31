import logger from "../utils/logger";

export const showSetupInfo = (): void => {
  logger.step("💳 Stripe Setup Instructions");

  logger.info("To complete Stripe integration:");
  logger.list(
    [
      "1. Create a Stripe account at https://stripe.com",
      "2. Get your API keys from the Stripe Dashboard",
      "3. Add them to your .env file:",
      "   • STRIPE_SECRET_KEY=sk_test_...",
      "   • NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...",
      "4. Configure your webhook endpoint (for production)",
    ],
    "cyan",
  );

  logger.info("\n💡 For development:");
  logger.list(
    [
      "• Use test keys (they start with sk_test_ and pk_test_)",
      "• Test payments with Stripe's test card numbers",
      "• Visit: https://stripe.com/docs/testing",
    ],
    "cyan",
  );
};
