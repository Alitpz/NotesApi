/**
 * App Configuration
 * Express uygulamasını yapılandırır
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler, notFound } from './middlewares/errorHandler';

/**
 * Express uygulamasını oluşturur ve yapılandırır
 */
const createApp = (): Application => {
  const app: Application = express();

  // Body Parser Middleware
  // JSON verilerini parse etmek için
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS Middleware
  // Cross-Origin istekleri için
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    })
  );

  // Request Logging Middleware (Development)
  if (process.env.NODE_ENV === 'development') {
    app.use((req: Request, res: Response, next) => {
      console.log(`📨 ${req.method} ${req.path}`);
      next();
    });
  }

  // Welcome Route
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'NotesApi - Backend Geliştirme Öğrenme Projesi',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        notes: '/api/notes',
        documentation: 'README.md dosyasına bakın',
      },
    });
  });

  // API Routes
  app.use('/api', routes);

  // 404 Handler - Route bulunamadığında
  app.use(notFound);

  // Error Handler - Tüm hataları yakalar
  app.use(errorHandler);

  return app;
};

export default createApp;

