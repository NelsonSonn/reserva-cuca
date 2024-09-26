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
 *         - name
 *         - roomType
 *         - cucaName
 *         - roomCapability
 *         - responsibleSector
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the room  
 *         roomType:
 *           type: string
 *           description: The type of the room (e.g., "LABORATORY", "STUDIO")
 *         cucaName:
 *           type: string
 *           descrption: The cuca where the room is located (e.g., "PICI", "BARRA")
 *         roomCapability:
 *           type: int 
 *           descrption: The amount of people that a room supports (e.g, 30)
 *         responsibleSector:
 *           type: string
 *           descrption: The sector that is responsible for the room (e.g, "TECHNOLOGY", "SPORT", "GERENCY")
 *   
 *       example:
 *         name: Laboratório 01
 *         roomType: LABORATORY
 *         cucaName: PICI
 *         roomCapability: 30
 *         responsibleSector: TECHNOLOGY
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Returns the list of all the rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: The list of the rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */

router.get('/rooms', authMiddleware, checkRole, roomController.getAllRooms);

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
