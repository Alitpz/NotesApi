/**
 * Note Service
 * Not ile ilgili iş mantığını (business logic) içerir
 */

import Note from '../models/note.model';
import { ICreateNoteInput, IUpdateNoteInput, INoteDocument } from '../interfaces/note.interface';

/**
 * Note Service Class
 * Veritabanı işlemlerini ve iş mantığını yönetir
 */
class NoteService {
  /**
   * Tüm notları getirir
   * @param includeArchived - Arşivlenmiş notları dahil et
   * @returns Promise<INoteDocument[]>
   */
  async getAllNotes(includeArchived: boolean = false): Promise<INoteDocument[]> {
    const filter = includeArchived ? {} : { isArchived: false };
    
    const notes = await Note.find(filter)
      .sort({ isPinned: -1, createdAt: -1 }) // Önce sabitlenmiş, sonra en yeni
      .exec();
    
    return notes;
  }

  /**
   * ID'ye göre not getirir
   * @param id - Not ID'si
   * @returns Promise<INoteDocument | null>
   */
  async getNoteById(id: string): Promise<INoteDocument | null> {
    const note = await Note.findById(id).exec();
    return note;
  }

  /**
   * Yeni not oluşturur
   * @param noteData - Not verileri
   * @returns Promise<INoteDocument>
   */
  async createNote(noteData: ICreateNoteInput): Promise<INoteDocument> {
    const note = new Note(noteData);
    await note.save();
    return note;
  }

  /**
   * Notu günceller
   * @param id - Not ID'si
   * @param updateData - Güncellenecek veriler
   * @returns Promise<INoteDocument | null>
   */
  async updateNote(id: string, updateData: IUpdateNoteInput): Promise<INoteDocument | null> {
    const note = await Note.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // Yeni veriyi döndür ve validasyonları çalıştır
    ).exec();
    
    return note;
  }

  /**
   * Notu siler
   * @param id - Not ID'si
   * @returns Promise<boolean>
   */
  async deleteNote(id: string): Promise<boolean> {
    const result = await Note.findByIdAndDelete(id).exec();
    return result !== null;
  }

  /**
   * Notu arşivler/arşivden çıkarır
   * @param id - Not ID'si
   * @param isArchived - Arşivlenecek mi?
   * @returns Promise<INoteDocument | null>
   */
  async toggleArchiveNote(id: string, isArchived: boolean): Promise<INoteDocument | null> {
    const note = await Note.findByIdAndUpdate(
      id,
      { $set: { isArchived } },
      { new: true }
    ).exec();
    
    return note;
  }

  /**
   * Notu sabitler/sabitlikten çıkarır
   * @param id - Not ID'si
   * @param isPinned - Sabitlenecek mi?
   * @returns Promise<INoteDocument | null>
   */
  async togglePinNote(id: string, isPinned: boolean): Promise<INoteDocument | null> {
    const note = await Note.findByIdAndUpdate(
      id,
      { $set: { isPinned } },
      { new: true }
    ).exec();
    
    return note;
  }

  /**
   * Notlarda arama yapar
   * @param searchTerm - Arama terimi
   * @returns Promise<INoteDocument[]>
   */
  async searchNotes(searchTerm: string): Promise<INoteDocument[]> {
    const notes = await Note.find({
      $text: { $search: searchTerm },
      isArchived: false,
    })
      .sort({ score: { $meta: 'textScore' } }) // Alakaya göre sırala
      .exec();
    
    return notes;
  }

  /**
   * Etikete göre notları getirir
   * @param tag - Etiket adı
   * @returns Promise<INoteDocument[]>
   */
  async getNotesByTag(tag: string): Promise<INoteDocument[]> {
    const notes = await Note.find({
      tags: tag,
      isArchived: false,
    })
      .sort({ isPinned: -1, createdAt: -1 })
      .exec();
    
    return notes;
  }
}

export default new NoteService();

