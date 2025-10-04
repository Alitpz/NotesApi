/**
 * Server Entry Point
 * Uygulamayı başlatır
 */

import createApp from './app';
import { config, validateEnv } from './config/env';
import { connectDatabase, setupDatabaseEventListeners } from './config/database';

/**
 * Sunucuyu başlatır
 */
const startServer = async (): Promise<void> => {
  try {
    // Environment değişkenlerini doğrula
    validateEnv();

    // Veritabanına bağlan
    await connectDatabase();
    
    // Veritabanı event listener'larını kur
    setupDatabaseEventListeners();

    // Express uygulamasını oluştur
    const app = createApp();

    // Sunucuyu başlat
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log('=================================');
      console.log('🚀 NotesApi Backend Başlatıldı');
      console.log('=================================');
      console.log(`📡 Server: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`📝 API Docs: http://localhost:${PORT}/api/health`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('❌ Sunucu başlatılamadı:', error);
    process.exit(1);
  }
};

// Sunucuyu başlat
startServer();

// Yakalanmamış Promise Hatalarını Yakala
process.on('unhandledRejection', (reason: any) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

// Yakalanmamış İstisnalar
process.on('uncaughtException', (error: Error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

