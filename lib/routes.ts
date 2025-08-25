// Route configuration for middleware protection
// This file defines which routes require authentication and/or subscription

// Public routes - no authentication required
export const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/confirm",
  "/auth/error",
  "/auth/sign-up-success",
] as const;

// Public API routes - no authentication required
export const PUBLIC_API_ROUTES = [
  "/api/stripe/webhook", // Stripe webhooks need to be public
] as const;

// Authenticated routes - login required (but no subscription required)
// These routes are automatically protected by authentication
export const AUTHENTICATED_ROUTES = ["/dashboard"] as const;

// Subscription-required routes - both authentication AND active subscription required
export const SUBSCRIPTION_REQUIRED_ROUTES: string[] = [
  // TODO: Add subscription-required routes here when needed
  // "/pro-features",               // Pro-only features page
  // "/api/pro-endpoints",          // Pro-only API routes
];

// Helper functions for route checking
export function isPublicRoute(pathname: string): boolean {
  return (
    PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    ) ||
    PUBLIC_API_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    )
  );
}

export function isAuthenticatedRoute(pathname: string): boolean {
  return AUTHENTICATED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

export function isSubscriptionRequiredRoute(pathname: string): boolean {
  return SUBSCRIPTION_REQUIRED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}
