import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isProtectedRoute =
  createRouteMatcher([
    "/dashboard(.*)",
    "/kanban(.*)",
    "/calendar(.*)",
    "/notes(.*)",
    "/whiteboard(.*)",
    "/spaces(.*)",
    "/settings(.*)",
    "/assistant(.*)",
    "/templates(.*)",
  ]);

export default clerkMiddleware(
  async (auth, req) => {
    if (
      isProtectedRoute(req)
    ) {
      await auth.protect();
    }
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html|css|js|gif|svg|jpg|jpeg|png|woff|woff2|ico|csv|docx|xlsx|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};