/**
 * API Response Utilities
 * Standart API yanıt formatları
 */

import { Response } from 'express';

/**
 * Başarılı yanıt formatı
 */
export interface ISuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

/**
 * Hata yanıt formatı
 */
export interface IErrorResponse {
  success: false;
  message: string;
  error?: string;
  stack?: string;
}

/**
 * Başarılı yanıt gönderir
 */
export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string
): Response => {
  const response: ISuccessResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  };

  return res.status(statusCode).json(response);
};

/**
 * Hata yanıtı gönderir
 */
export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: string,
  stack?: string
): Response => {
  const response: IErrorResponse = {
    success: false,
    message,
    ...(error && { error }),
    ...(stack && process.env.NODE_ENV === 'development' && { stack }),
  };

  return res.status(statusCode).json(response);
};

