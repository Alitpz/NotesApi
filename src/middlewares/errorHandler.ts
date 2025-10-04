/**
 * Error Handler Middleware
 * Tüm hataları yakalayan ve uygun yanıt döndüren middleware
 */

import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

/**
 * Özel hata sınıfı
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global hata yakalayıcı middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Sunucu hatası';

  // Mongoose validation hatası
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e: any) => e.message);
    message = `Geçersiz veri: ${errors.join(', ')}`;
  }

  // Mongoose duplicate key hatası
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Bu kayıt zaten mevcut';
  }

  // Mongoose geçersiz ID hatası
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Geçersiz ID formatı';
  }

  // JWT hatası
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Geçersiz token';
  }

  // JWT süresi dolmuş
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token süresi dolmuş';
  }

  console.error('❌ Hata:', err);

  sendError(
    res,
    statusCode,
    message,
    err.name,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
};

/**
 * 404 Not Found hatası
 */
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Route bulunamadı: ${req.originalUrl}`, 404);
  next(error);
};

