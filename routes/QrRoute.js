import qController from '../controllers/qrGenerator.js';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: QRCode
 *   description: QR Code generation endpoint
 */

/**
 * @swagger
 * /Qrcode/{id}:
 *   get:
 *     summary: Generate a QR code based on the provided ID
 *     tags: [QRCode]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID for which the QR code will be generated
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */


router.get('/Qrcode/:id',qController.generator);

export default router;