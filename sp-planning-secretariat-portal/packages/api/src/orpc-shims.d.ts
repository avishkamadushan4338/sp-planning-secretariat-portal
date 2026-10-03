declare module "@orpc/server" {
  export const os: {
    $context<T>(): any;
  };
  export class ORPCError extends Error {
    constructor(code: string, options?: { message?: string });
  }
}
