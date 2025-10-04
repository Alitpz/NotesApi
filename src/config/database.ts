/**
 * Database Configuration
 * MongoDB bağlantı ayarlarını yöneten modül
 */

import mongoose from 'mongoose';

/**
 * MongoDB'ye bağlantı kurar
 * @returns Promise<void>
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapi';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB bağlantısı başarılı');
    console.log(`📊 Veritabanı: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error);
    // Uygulama veritabanına bağlanamazsa çıkış yap
    process.exit(1);
  }
};

/**
 * MongoDB bağlantı olaylarını dinler
 */
export const setupDatabaseEventListeners = (): void => {
  // Bağlantı kesildiğinde
  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB bağlantısı kesildi');
  });

  // Bağlantı hatası oluştuğunda
  mongoose.connection.on('error', (error) => {
    console.error('❌ MongoDB bağlantı hatası:', error);
  });

  // Uygulama kapatıldığında bağlantıyı kapat
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  });
};

