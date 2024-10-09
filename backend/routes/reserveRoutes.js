const express = require('express');
const reserveController = require('../controllers/reserveController');
const router = express.Router();
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Reserves
 *   description: Reserve management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reserve:
 *       type: object
 *       required:
 *         - user_id
 *         - room_id
 *         - description
 *         - reserveStatus
 *         - startDate
 *         - endDate
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The id of the user
 *         room_id:
 *           type: integer
 *           description: The id of the room
 *         description:
 *           type: string
 *           description: The description of the reserve
 *         reserveStatus:
 *           type: string
 *           description: The status of a reserve (e.g., PENDING, CONFIRMED, CANCELLED)
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start time of the reserve
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end time of the reserve
 *       example:
 *         user_id: 1
 *         room_id: 4
 *         description: Aulas do Costurando o Futuro
 *         reserveStatus: PENDING
 *         startDate: 2024-10-01T10:00:00Z
 *         endDate: 2024-11-01T12:00:00Z
 */

/**
 * @swagger
 * /reserves:
 *   get:
 *     summary: Return a list of reserves
 *     tags: [Reserves]
 *     parameters:
 *       - in: query
 *         name: reserveStatus
 *         schema:
 *           type: string
 *           enum: ['PENDING', 'CONFIRMED', 'CANCELLED']
 *         description: All reserves filtered by status
 *       - in: query
 *         name: dateReserveFilter
 *         schema:
 *           type: string
 *         description: All reserves on a specific day
 *       - in: query
 *         name: ~ intervalo de data 
 *         schema:
 *           type: string
 *         description: The final date of the reserve
 *     responses:
 *       200:
 *         description: A list of reserves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserve'
 *       500:
 *         description: Error fetching reserves
 */
router.get('/reserves', authMiddleware, reserveController.getAllReserves);

/**
 * @swagger
 * /reserves:
 *   post:
 *     summary: Create a new reserve
 *     tags: [Reserves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserve'
 *     responses:
 *       201:
 *         description: The reserve was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserve'
 *       400:
 *         description: Reserve already registered
 *       500:
 *         description: Error creating reserve
 */
router.post('/reserves', authMiddleware, reserveController.createReserve);

/**
 * @swagger
 * /reserves/{id}:
 *   put:
 *     summary: Update a reserve
 *     tags: [Reserves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reserve id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserve'
 *     responses:
 *       200:
 *         description: The reserve was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserve'
 *       400:
 *         description: Error updating reserve
 */
router.put('/reserves/:id', authMiddleware, reserveController.updateReserve);

/**
 * @swagger
 * /reserves/{id}:
 *   delete:
 *     summary: Delete a reserve
 *     tags: [Reserves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reserve id
 *     responses:
 *       204:
 *         description: The reserve was successfully deleted
 *       500:
 *         description: Error deleting reserve
 */
router.delete('/reserves/:id', authMiddleware, reserveController.deleteReserve);

module.exports = router;