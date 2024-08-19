const express = require('express');
const router = express.Router();
const { getUserById, createUser, updateUser, deleteUser, login } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate.js');

router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.put('/user/:id', authenticate, updateUser);
router.delete('/user/:id', authenticate, deleteUser);
router.post('/login', login);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - surname
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         firstname:
 *           type: string
 *           description: Primeiro nome do usuário
 *         surname:
 *           type: string
 *           description: Sobrenome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         confirmPassword:
 *           type: string
 *           description: Confirmação da senha do usuário
 */

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     summary: Obter informações do usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Informações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /v1/user:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /v1/user/{id}:
 *   put:
 *     summary: Atualizar informações do usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       204:
 *         description: Usuário atualizado com sucesso, sem corpo de resposta
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /v1/user/{id}:
 *   delete:
 *     summary: Deletar um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso, sem corpo de resposta
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Login de usuário e obtenção de token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT e informações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                 name:
 *                   type: string
 *                   description: Nome completo do usuário
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

module.exports = router;
