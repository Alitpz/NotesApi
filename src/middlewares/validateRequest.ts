/**
 * Request Validation Middleware
 * İstek verilerini doğrular
 */

import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

/**
 * Not oluşturma isteğini doğrular
 */
export const validateCreateNote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, content } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    sendError(res, 400, 'Not başlığı zorunludur ve boş olamaz');
    return;
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    sendError(res, 400, 'Not içeriği zorunludur ve boş olamaz');
    return;
  }

  if (title.length > 100) {
    sendError(res, 400, 'Not başlığı en fazla 100 karakter olabilir');
    return;
  }

  if (content.length > 5000) {
    sendError(res, 400, 'Not içeriği en fazla 5000 karakter olabilir');
    return;
  }

  next();
};

/**
 * Not güncelleme isteğini doğrular
 */
export const validateUpdateNote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, content, tags, isArchived, isPinned, color } = req.body;

  // En az bir alan güncellenmelidir
  if (!title && !content && !tags && isArchived === undefined && isPinned === undefined && !color) {
    sendError(res, 400, 'Güncellenecek en az bir alan belirtilmelidir');
    return;
  }

  // Başlık kontrolü
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      sendError(res, 400, 'Not başlığı boş olamaz');
      return;
    }
    if (title.length > 100) {
      sendError(res, 400, 'Not başlığı en fazla 100 karakter olabilir');
      return;
    }
  }

  // İçerik kontrolü
  if (content !== undefined) {
    if (typeof content !== 'string' || content.trim().length === 0) {
      sendError(res, 400, 'Not içeriği boş olamaz');
      return;
    }
    if (content.length > 5000) {
      sendError(res, 400, 'Not içeriği en fazla 5000 karakter olabilir');
      return;
    }
  }

  // Etiket kontrolü
  if (tags !== undefined) {
    if (!Array.isArray(tags)) {
      sendError(res, 400, 'Etiketler bir dizi olmalıdır');
      return;
    }
    if (tags.length > 10) {
      sendError(res, 400, 'En fazla 10 etiket ekleyebilirsiniz');
      return;
    }
  }

  // Renk kontrolü
  if (color !== undefined) {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!colorRegex.test(color)) {
      sendError(res, 400, 'Geçerli bir renk kodu giriniz (örn: #ffffff)');
      return;
    }
  }

  next();
};

/**
 * MongoDB ObjectId formatını doğrular
 */
export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  if (!objectIdRegex.test(id)) {
    sendError(res, 400, 'Geçersiz ID formatı');
    return;
  }

  next();
};

