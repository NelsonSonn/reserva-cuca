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
 *         - startTime
 *         - endTime
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
 *           format: date
 *           description: The start date of the reserve
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the reserve
 *         startTime:
 *           type: string
 *           format: time
 *           description: The start time of the reserve
 *       endTime:
 *          type: string
 *          format: time
 *          description: The end time of the reserve
 * 
 *       example:
 *         user_id: 1
 *         room_id: 1
 *         description: Aulas do Costurando o Futuro
 *         startDate: 2024-10-01
 *         endDate: 2024-11-01
 *         startTime: 08:00:00
 *         endTime: 12:00:00
 * 
 *   ReserveRequest:
 *     type: object
 *     properties:
 *       user_id:
 *          type: integer
 *       room_id:
 *          type: integer
 *       description:
 *          type: string
 *       startDate:
 *          type: string
 *          format: date-time
 *       endDate:
 *          type: string
 *          format: date-time
 *       startTime:
 *          type: string
 *          format: time
 *       endTime:
 *          type: string
 *          format: time
 *     required:
 *      - user_id
 *      - room_id
 *      - description
 *      - startDate
 *      - endDate
 *      - startTime
 *      - endTime
 * 
 *   ReserveResponse:
 *     type: object
 *     properties:
 *       user_id:
 *          type: integer
 *       room_id:
 *          type: integer
 *       description:
 *          type: string
 *       reserveStatus:
 *          type: string
 *          enum:
 *          - PENDING
 *          - CONFIRMED
 *          - CANCELLED
 *       startDate:
 *          type: string
 *          format: date-time
 *       endDate:
 *          type: string
 *          format: date-time
 *       startTime:
 *          type: string
 *          format: time 
 *       endTime:
 *          type: string
 *          format: time
 * 
 *     required:
 *      - user_id
 *      - room_id
 *      - description
 *      - startDate
 *      - endDate
 *      - startTime
 *      - endTime
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
 *         name: startDate
 *         schema:
 *           type: string
 *         description: The start date for reserves in a specific date interval
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: The end date for reserves in a specific date interval
 *       - in: query
 *         name: cucaName
 *         schema:
 *           type: string
 *           enum: ['BARRA', 'PICI', 'MONBUDIM', 'JOSE_WALTER', 'JANGURUSSU']
 *         description: All reserves filtered by CUCA
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: All reserves filtered by User
 *       - in: query
 *         name: responsibleSector
 *         schema:
 *           type: string
 *           enum: ['SPORT', 'CULTURE', 'TECHNOLOGY', 'GERENCY', 'RH']
 *         description: All reserves filtered by Sector
 *       - in: query
 *         name: dateAndRoomFilter
 *         schema:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date
 *             room_id:
 *               type: integer
 *         description: All reserves filtered by a specific date and room_id
 * 
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
 * 
 */
router.post('/reserves', authMiddleware, reserveController.createReserve);

/**
 * @swagger
 * /reserves/{id}:
 *   post:
 *     summary: Approve a reserve
 *     tags: [Reserves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the reserve to approve
 *     responses:
 *       201:
 *         description: The reserve was successfully approved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserve'
 *       400:
 *         description: Reserve already has a 'CONFIRMED' status
 *       500:
 *         description: An error occurred while approving the reserve
 */
router.post('/reserves/:id', authMiddleware, checkRole, reserveController.approveReserve);

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
 *          schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               room_id:
 *                 type: integer
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *                 format: time
 *               endTime:
 *                 type: string
 *                 format: time
 *               reserveStatus:
 *                 type: string
 *                 enum: ['PENDING', 'CONFIRMED', 'CANCELLED']
 *             example:
 *               user_id: 1
 *               room_id: 2
 *               description: "Reserva para o programa Futuros"
 *               startDate: "2025-01-01"
 *               endDate: "2025-01-31"
 *               startTime: "13:00"
 *               endTime: "17:00"
 *               reserveStatus: "CONFIRMED"
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
router.put('/reserves/:id', authMiddleware, checkRole, reserveController.updateReserve);

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
router.delete('/reserves/:id', authMiddleware, checkRole, reserveController.deleteReserve);

module.exports = router;