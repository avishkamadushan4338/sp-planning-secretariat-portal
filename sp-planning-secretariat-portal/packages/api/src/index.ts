import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

/**
 * Requires any authenticated session.
 */
const requireAuth = o.middleware(({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Authentication required",
    });
  }
  return next({
    context: {
      session: context.session,
    },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuth);

/**
 * Requires a content-management role.
 *
 * Being merely authenticated is not enough to edit site content: the `store`
 * seat exists for inventory management in the SMP module and must not be able
 * to rewrite public pages. Previously every write was gated on `session.user`
 * alone, so any signed-in account — including a store operator — could publish
 * changes to the portal.
 */
const requireContentRole = o.middleware(({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Authentication required",
    });
  }

  const role = context.session.user.role;
  if (role !== "admin" && role !== "secretary") {
    throw new ORPCError("FORBIDDEN", {
      message: "Your account does not have permission to edit site content",
    });
  }

  return next({
    context: {
      session: context.session,
    },
  });
});

/** Procedures that mutate site content. Restricted to content-management roles. */
export const contentProcedure = publicProcedure.use(requireContentRole);