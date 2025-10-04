/**
 * Note Model
 * Not için Mongoose şema ve model tanımlamaları
 */

import mongoose, { Schema, Model } from 'mongoose';
import { INoteDocument } from '../interfaces/note.interface';

/**
 * Note Schema
 * MongoDB koleksiyonunun yapısını tanımlar
 */
const noteSchema = new Schema<INoteDocument>(
  {
    title: {
      type: String,
      required: [true, 'Not başlığı zorunludur'],
      trim: true,
      maxlength: [100, 'Başlık en fazla 100 karakter olabilir'],
    },
    content: {
      type: String,
      required: [true, 'Not içeriği zorunludur'],
      trim: true,
      maxlength: [5000, 'İçerik en fazla 5000 karakter olabilir'],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 10;
        },
        message: 'En fazla 10 etiket ekleyebilirsiniz',
      },
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#ffffff',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Geçerli bir renk kodu giriniz'],
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik oluşturulur
    versionKey: false, // __v alanını kaldır
  }
);

/**
 * Index'ler - Sorgu performansını artırır
 */
noteSchema.index({ title: 'text', content: 'text' }); // Metin araması için
noteSchema.index({ createdAt: -1 }); // Tarihe göre sıralama için
noteSchema.index({ isPinned: -1, createdAt: -1 }); // Sabitlenmiş notlar için

/**
 * Note Model
 */
const Note: Model<INoteDocument> = mongoose.model<INoteDocument>('Note', noteSchema);

export default Note;

