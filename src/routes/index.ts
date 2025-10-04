/**
 * Routes Index
 * Tüm route'ları birleştirir
 */

import { Router } from 'express';
import noteRoutes from './note.routes';

const router = Router();

/**
 * API Routes
 */
router.use('/notes', noteRoutes);

/**
 * Health Check Endpoint
 * API'nin çalışıp çalışmadığını kontrol eder
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API çalışıyor',
    timestamp: new Date().toISOString(),
  });
});

export default router;

