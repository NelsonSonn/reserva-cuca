const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - birthDate
 *         - telephone 
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         telephone:
 *           type: string
 *           description: The user's telephone number
 *         role:
 *           type: string
 *           description: The user's role in the system (e.g., GERENCY, SUPERVISOR,TEACHER)
 *       example:
 *         name: Kathy Johanson
 *         email: kathyj@example.com
 *         password: password123
 *         telephone: "(00)90000-0000"
 *         role: TEACHER
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token generated upon successful login
 *         expiresIn:
 *           type: string
 *           description: The expiration time of the token (e.g., '1h')
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *         expiresIn: "1h"
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: kathyj@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully authenticated, returning JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', userController.userLogin);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all users or filtered by name, email, or role
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the user to filter by (partial match)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The email of the user to filter by (partial match)
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: The role of the user to filter by (exact match)
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The id of the user to filter by (exact match)
 *     responses:
 *       200:
 *         description: The list of users, filtered if query parameters are provided
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/users', authMiddleware, userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened 
 */
router.put('/users/:id', authMiddleware, userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       204:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;