import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const defaultErrorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = err instanceof Error ? err : new Error("Unknown error");

  const statusCode = (err as any).statusCode || 500;

  console.error(error);

  const response = {
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Oops, something happened!",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(statusCode).json(response);
};
