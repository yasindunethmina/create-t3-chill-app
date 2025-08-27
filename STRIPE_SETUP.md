# Stripe Integration Setup Guide

This guide will walk you through setting up Stripe integration for subscription management in Create T3 Chill App.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Stripe CLI installed (for webhook testing)
3. Your application running locally

## Step 1: Get Your Stripe Keys

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers > API keys**
3. Copy your **Publishable key** and **Secret key** (use test keys for development)

## Step 2: Create a Product and Price

1. In your Stripe Dashboard, go to **Products**
2. Click **+ Add product**
3. Fill in product details:
   - **Name**: Pro Subscription (or your preferred name)
   - **Description**: Access to premium features
4. Add pricing:
   - **Pricing model**: Standard pricing
   - **Price**: $9.99 (or your preferred amount)
   - **Billing period**: Monthly
5. Click **Save product**
6. Copy the **Price ID** (starts with `price_`)

## Step 3: Environment Variables

Add these variables to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Step 4: Set Up Webhooks (Local Development)

1. Install Stripe CLI if you haven't already:

   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows
   scoop install stripe

   # Or download from https://github.com/stripe/stripe-cli/releases
   ```

2. Login to Stripe CLI:

   ```bash
   stripe login
   ```

3. Forward events to your local webhook endpoint:

   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

## Step 5: Set Up Webhooks (Production)

1. In your Stripe Dashboard, go to **Developers > Webhooks**
2. Click **+ Add endpoint**
3. Set the endpoint URL to: `https://yourdomain.com/api/stripe/webhook`
4. Select these events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** and add it to your production environment variables

## Step 6: Verify Configuration

The application will automatically validate your Stripe configuration. If any required environment variables are missing, you'll see helpful error messages in the dashboard.

The subscription configuration is managed in `/lib/stripe.ts` where you can:

- Update subscription plans and pricing
- Add new subscription tiers
- Customize features for each plan

## Testing the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. In another terminal, start the Stripe webhook listener:

   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

3. Navigate to `/dashboard` in your browser
4. Try the subscription flow with Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Declined**: `4000 0000 0000 0002`
   - Use any future expiry date and any 3-digit CVC

## Features Included

### ✅ What's Working

- **Subscription Cards**: Clean UI for subscription management with automatic Stripe validation
- **Checkout Integration**: Secure Stripe Checkout flow with environment variable safeguards
- **Webhook Handling**: Clean, event-driven architecture for real-time subscription updates
- **Protected Content**: `subscribedProcedure` for protected tRPC endpoints
- **Status Display**: Real-time subscription status in dashboard
- **Error Handling**: Proper error messages with Sonner toasts
- **Configuration Management**: Centralized subscription config in `/lib/stripe.ts`
- **Environment Validation**: Automatic validation of required Stripe environment variables

### 🛠️ tRPC Procedures

- `createCheckoutSession`: Creates Stripe checkout session with automatic price configuration
- `getSubscriptionStatus`: Gets current subscription status and Stripe configuration validation
- `verifyCheckoutSession`: Verifies successful checkout sessions
- `getProFeatures`: Protected endpoint for subscribers only (example)

### 🔒 Protected Content

Use the `subscribedProcedure` in your tRPC routes to protect content:

```typescript
myProtectedRoute: subscribedProcedure.query(async ({ ctx }) => {
  // This will only run for users with active subscriptions
  return { message: "This is premium content!" };
});
```

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**:
   - Ensure Stripe CLI is running and forwarding to the correct port
   - Check that your webhook endpoint is accessible

2. **Subscription status not updating**:
   - Verify webhook events are being received
   - Check database for subscription records
   - Ensure webhook secret is correct

3. **Checkout not redirecting**:
   - Verify success/cancel URLs in checkout session
   - Check `NEXT_PUBLIC_BASE_URL` environment variable

### Debug Tips

- Check webhook logs in Stripe Dashboard
- Monitor server logs for webhook processing
- Use Stripe CLI to replay events: `stripe events resend evt_...`

## Security Notes

- Never expose your secret key in client-side code
- Always validate webhook signatures
- Use HTTPS in production
- Keep your Stripe CLI and dependencies updated

## Next Steps

1. Customize subscription tiers and pricing
2. Add subscription management (cancel, upgrade/downgrade)
3. Implement usage-based billing if needed
4. Add subscription analytics
5. Set up proper error monitoring

Need help? Check the [Stripe documentation](https://stripe.com/docs) or [create an issue](https://github.com/your-repo/issues).
