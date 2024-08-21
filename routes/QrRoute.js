import qController from '../controllers/qrGenerator.js';
import express from 'express';

const router = express.Router();



router.get('/Qrcode/:id',qController.generator);

export default router;