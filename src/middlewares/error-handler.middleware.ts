import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Erros de validação Zod
  if (typeof err === 'object' && err !== null && 'issues' in err) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: (err as any).issues,
    });
  }

  const status = (err as any)?.statusCode ?? 500;
  const message = (err as any)?.message ?? 'Internal server error';

  return res.status(status).json({
    success: false,
    message,
  });
}

