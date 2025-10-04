/**
 * Note Routes
 * Not ile ilgili endpoint'leri tanımlar
 */

import { Router } from 'express';
import noteController from '../controllers/note.controller';
import {
  validateCreateNote,
  validateUpdateNote,
  validateObjectId,
} from '../middlewares/validateRequest';

const router = Router();

/**
 * @route   GET /api/notes
 * @desc    Tüm notları getirir
 * @access  Public
 * @query   includeArchived=true - Arşivlenmiş notları dahil et
 */
router.get('/', noteController.getAllNotes);

/**
 * @route   GET /api/notes/search
 * @desc    Notlarda arama yapar
 * @access  Public
 * @query   q=arama_terimi - Arama terimi
 */
router.get('/search', noteController.searchNotes);

/**
 * @route   GET /api/notes/tag/:tag
 * @desc    Etikete göre notları getirir
 * @access  Public
 */
router.get('/tag/:tag', noteController.getNotesByTag);

/**
 * @route   GET /api/notes/:id
 * @desc    ID'ye göre not getirir
 * @access  Public
 */
router.get('/:id', validateObjectId, noteController.getNoteById);

/**
 * @route   POST /api/notes
 * @desc    Yeni not oluşturur
 * @access  Public
 */
router.post('/', validateCreateNote, noteController.createNote);

/**
 * @route   PUT /api/notes/:id
 * @desc    Notu günceller
 * @access  Public
 */
router.put('/:id', validateObjectId, validateUpdateNote, noteController.updateNote);

/**
 * @route   DELETE /api/notes/:id
 * @desc    Notu siler
 * @access  Public
 */
router.delete('/:id', validateObjectId, noteController.deleteNote);

/**
 * @route   PATCH /api/notes/:id/archive
 * @desc    Notu arşivler/arşivden çıkarır
 * @access  Public
 */
router.patch('/:id/archive', validateObjectId, noteController.toggleArchiveNote);

/**
 * @route   PATCH /api/notes/:id/pin
 * @desc    Notu sabitler/sabitlikten çıkarır
 * @access  Public
 */
router.patch('/:id/pin', validateObjectId, noteController.togglePinNote);

export default router;

