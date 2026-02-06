/**
 * Custom application error with HTTP status code and error code.
 */
export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Format an error into a consistent API response body.
 */
export function formatError(error: unknown, requestId?: string) {
  if (error instanceof AppError) {
    return {
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      meta: { requestId },
    };
  }

  // Don't leak internal errors in production
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : error instanceof Error
        ? error.message
        : "Unknown error";

  return {
    error: {
      code: "INTERNAL_ERROR",
      message,
    },
    meta: { requestId },
  };
}
