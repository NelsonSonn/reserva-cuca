const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();
const { authMiddleware , checkRole} = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - roomType
 *         - name
 *         - cucaName
 *         - roomCapability
 *         - responsibleSector
 *       properties:
 *         roomType:
 *           type: string
 *           enum: ['LABORATORY', 'THEATER', 'CINEMA', 'COWORK', 'LIBRARY', 'STUDIO', 'CINECLUBE', 'MULTIUSO']
 *           description: Type of the room
 *         name:
 *           type: string
 *           description: Name of the room
 *         cucaName:
 *           type: string
 *           enum: ['BARRA', 'PICI', 'MONBUDIM', 'JOSE_WALTER', 'JANGURUSSU']
 *           description: CUCA location
 *         roomCapability:
 *           type: integer
 *           description: Maximum room capacity
 *         responsibleSector:
 *           type: string
 *           enum: ['SPORT', 'CULTURE', 'TECHNOLOGY', 'GERENCY', 'RH']
 *           description: Responsible sector for the room
 *       example:
 *         roomType: COWORK
 *         name: Sala Cowork Barra
 *         cucaName: BARRA
 *         roomCapability: 20
 *         responsibleSector: TECHNOLOGY
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Returns the list of all the rooms
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: cucaName
 *         schema:
 *           type: string
 *           enum: ['BARRA', 'PICI', 'MONBUDIM', 'JOSE_WALTER', 'JANGURUSSU']
 *         description: Filter by CUCA location
 *       - in: query
 *         name: responsibleSector
 *         schema:
 *           type: string
 *           enum: ['SPORT', 'CULTURE', 'TECHNOLOGY', 'GERENCY', 'RH']
 *         description: Filter by responsible sector
 *       - in: query
 *         name: roomCapability
 *         schema:
 *           type: integer
 *         description: Filter by rooms that can hold up to X people
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by room name (partial match)
 *       - in: query
 *         name: roomType
 *         schema:
 *           type: string
 *           enum: ['LABORATORY', 'THEATER', 'CINEMA', 'COWORK', 'LIBRARY', 'STUDIO', 'CINECLUBE', 'MULTIUSO']
 *         description: Filter by room type
 *     responses:
 *       200:
 *         description: The list of the rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Some server error
 */
router.get('/rooms', authMiddleware, roomController.getAllRooms);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: The room was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Some server error
 */
router.post('/rooms', authMiddleware, checkRole, roomController.createRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Update the room by the id
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: The room was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: The room was not found
 *       500:
 *         description: Some error happened
 */
router.put('/rooms/:id', authMiddleware, checkRole, roomController.updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Remove the room by id
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The room id
 *     responses:
 *       204:
 *         description: The room was deleted
 *       404:
 *         description: The room was not found
 */
router.delete('/rooms/:id', authMiddleware, checkRole, roomController.deleteRoom);

module.exports = router;