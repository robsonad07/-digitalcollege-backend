const express = require('express');
const router = express.Router();
const {getCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById} = require('../controllers/CategoryController');
const authenticate = require('../middleware/authenticate.js');

router.get('/category/search', getCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', authenticate,  createCategory);
router.put('/category/:id', authenticate, updateCategoryById);
router.delete('/category/:id', authenticate, deleteCategoryById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - use_in_menu
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da categoria
 *         slug:
 *           type: string
 *           description: Slug da categoria (identificador único)
 *         use_in_menu:
 *           type: boolean
 *           description: Indica se a categoria deve aparecer no menu
 */

/**
 * @swagger
 * /v1/category/search:
 *   get:
 *     summary: Obter uma lista de categorias
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Número de itens por página. Use -1 para buscar todos os itens.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados. Não tem efeito se limit for -1.
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *           default: name,slug
 *         description: Campos a serem retornados
 *       - in: query
 *         name: use_in_menu
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Filtrar categorias que podem aparecer no menu
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 total:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 page:
 *                   type: integer
 *       400:
 *         description: Dados da requisição inválidos
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /v1/category/{id}:
 *   get:
 *     summary: Obter informações da categoria pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Informações da categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /v1/category:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Dados da requisição inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /v1/category/{id}:
 *   put:
 *     summary: Atualizar uma categoria pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       204:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Dados da requisição inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /v1/category/{id}:
 *   delete:
 *     summary: Deletar uma categoria pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */


module.exports = router;
