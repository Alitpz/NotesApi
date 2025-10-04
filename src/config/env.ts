/**
 * Environment Variables Configuration
 * Çevre değişkenlerini yükler ve doğrular
 */

import dotenv from 'dotenv';

// .env dosyasını yükle
dotenv.config();

/**
 * Uygulama yapılandırması
 */
export const config = {
  // Server ayarları
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database ayarları
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapi',
  
  // JWT ayarları (İleride kullanacağız)
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
} as const;

/**
 * Gerekli environment değişkenlerini kontrol eder
 */
export const validateEnv = (): void => {
  const requiredEnvVars = ['MONGODB_URI'];
  
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );
  
  if (missingEnvVars.length > 0) {
    console.warn(
      `⚠️ Uyarı: Şu environment değişkenleri eksik: ${missingEnvVars.join(', ')}`
    );
    console.warn('📝 Varsayılan değerler kullanılacak');
  }
};

