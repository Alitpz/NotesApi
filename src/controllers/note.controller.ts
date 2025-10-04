/**
 * Note Controller
 * HTTP isteklerini işler ve uygun servisleri çağırır
 */

import { Request, Response, NextFunction } from 'express';
import noteService from '../services/note.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../middlewares/errorHandler';

/**
 * Note Controller Class
 * Route handler'ları içerir
 */
class NoteController {
  /**
   * Tüm notları getirir
   * GET /api/notes
   */
  getAllNotes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const includeArchived = req.query.includeArchived === 'true';
    
    const notes = await noteService.getAllNotes(includeArchived);
    
    sendSuccess(res, 200, notes, 'Notlar başarıyla getirildi');
  });

  /**
   * Tek bir notu getirir
   * GET /api/notes/:id
   */
  getNoteById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    const note = await noteService.getNoteById(id);
    
    if (!note) {
      throw new AppError('Not bulunamadı', 404);
    }
    
    sendSuccess(res, 200, note, 'Not başarıyla getirildi');
  });

  /**
   * Yeni not oluşturur
   * POST /api/notes
   */
  createNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const noteData = req.body;
    
    const note = await noteService.createNote(noteData);
    
    sendSuccess(res, 201, note, 'Not başarıyla oluşturuldu');
  });

  /**
   * Notu günceller
   * PUT /api/notes/:id
   */
  updateNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;
    
    const note = await noteService.updateNote(id, updateData);
    
    if (!note) {
      throw new AppError('Not bulunamadı', 404);
    }
    
    sendSuccess(res, 200, note, 'Not başarıyla güncellendi');
  });

  /**
   * Notu siler
   * DELETE /api/notes/:id
   */
  deleteNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    const deleted = await noteService.deleteNote(id);
    
    if (!deleted) {
      throw new AppError('Not bulunamadı', 404);
    }
    
    sendSuccess(res, 200, { id }, 'Not başarıyla silindi');
  });

  /**
   * Notu arşivler/arşivden çıkarır
   * PATCH /api/notes/:id/archive
   */
  toggleArchiveNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { isArchived } = req.body;
    
    if (typeof isArchived !== 'boolean') {
      throw new AppError('isArchived alanı boolean olmalıdır', 400);
    }
    
    const note = await noteService.toggleArchiveNote(id, isArchived);
    
    if (!note) {
      throw new AppError('Not bulunamadı', 404);
    }
    
    sendSuccess(
      res,
      200,
      note,
      isArchived ? 'Not arşivlendi' : 'Not arşivden çıkarıldı'
    );
  });

  /**
   * Notu sabitler/sabitlikten çıkarır
   * PATCH /api/notes/:id/pin
   */
  togglePinNote = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { isPinned } = req.body;
    
    if (typeof isPinned !== 'boolean') {
      throw new AppError('isPinned alanı boolean olmalıdır', 400);
    }
    
    const note = await noteService.togglePinNote(id, isPinned);
    
    if (!note) {
      throw new AppError('Not bulunamadı', 404);
    }
    
    sendSuccess(
      res,
      200,
      note,
      isPinned ? 'Not sabitlendi' : 'Not sabitlikten çıkarıldı'
    );
  });

  /**
   * Notlarda arama yapar
   * GET /api/notes/search?q=arama_terimi
   */
  searchNotes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm || searchTerm.trim().length === 0) {
      throw new AppError('Arama terimi gereklidir', 400);
    }
    
    const notes = await noteService.searchNotes(searchTerm);
    
    sendSuccess(res, 200, notes, `"${searchTerm}" için ${notes.length} sonuç bulundu`);
  });

  /**
   * Etikete göre notları getirir
   * GET /api/notes/tag/:tag
   */
  getNotesByTag = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { tag } = req.params;
    
    if (!tag || tag.trim().length === 0) {
      throw new AppError('Etiket gereklidir', 400);
    }
    
    const notes = await noteService.getNotesByTag(tag);
    
    sendSuccess(res, 200, notes, `"${tag}" etiketi için ${notes.length} not bulundu`);
  });
}

export default new NoteController();

