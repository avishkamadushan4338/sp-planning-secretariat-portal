import type { Context as ApiContext } from "@sp-planning/api/context";
import { db, auth } from "./services.server";

export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<ApiContext> => {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: req.headers,
    });
  } catch (e) {
    // unauthenticated request
  }

  return {
    db,
    session: session ? {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role,
      }
    } : null,
    auth,
    headers: req.headers,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
