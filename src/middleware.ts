// import {
//   convexAuthNextjsMiddleware,
//   createRouteMatcher,
//   isAuthenticatedNextjs,
//   nextjsMiddlewareRedirect,
// } from "@convex-dev/auth/nextjs/server";

// const isPublicPage = createRouteMatcher(["/auth"]);

// export default convexAuthNextjsMiddleware(async (request) => {
//   // Use await to properly wait for the Promise to resolve
//   const isAuthenticated = await isAuthenticatedNextjs();

//   if (!isPublicPage(request) && !isAuthenticated) {
//     return nextjsMiddlewareRedirect(request, "/auth");
//   }

//   if (isPublicPage(request) && isAuthenticated) {
//     return nextjsMiddlewareRedirect(request, "/");
//   }
// });

// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


// ireakany naxordn a, esi update versia a log outi hamar 


import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const isAuthenticated = await isAuthenticatedNextjs();

  if (!isPublicPage(request) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  if (isPublicPage(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


// import {
//   createRouteMatcher,
//   convexAuthNextjsMiddleware,
//   nextjsMiddlewareRedirect,
// } from "@convex-dev/auth/nextjs/server";
// import { isAuthenticated } from "./convex/auth";

// const isPublicPage = createRouteMatcher(["/signin"]);

// export default convexAuthNextjsMiddleware((request) => {
//   if (!isPublicPage(request) && !isAuthenticated) {
//     return nextjsMiddlewareRedirect(request, "/auth");
//   }

//   if (isPublicPage(request) && isAuthenticated) {
//     return nextjsMiddlewareRedirect(request, "/");
//   }
// });

// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
