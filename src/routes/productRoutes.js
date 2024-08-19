const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProductById, deleteProductById } = require('../controllers/ProductController');
const authenticate = require('../middleware/authenticate.js');

router.get('/product/search', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', authenticate, createProduct);
router.put('/product/:id', authenticate, updateProductById);
router.delete('/product/:id', authenticate, deleteProductById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - price
 *       properties:
 *         enabled:
 *           type: boolean
 *           description: Indica se o produto está habilitado
 *         name:
 *           type: string
 *           description: Nome do produto
 *         slug:
 *           type: string
 *           description: Slug do produto
 *         stock:
 *           type: integer
 *           description: Quantidade em estoque
 *         description:
 *           type: string
 *           description: Descrição do produto
 *         price:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         price_with_discount:
 *           type: number
 *           format: float
 *           description: Preço do produto com desconto
 *         category_ids:
 *           type: array
 *           items:
 *             type: integer
 *           description: IDs das categorias do produto
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da imagem
 *               content:
 *                 type: string
 *                 format: url
 *                 description: URL da imagem
 *         options:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da opção
 *               title:
 *                 type: string
 *                 description: Título da opção
 *               shape:
 *                 type: string
 *                 description: Forma da opção
 *               radius:
 *                 type: string
 *                 description: Raio da opção
 *               type:
 *                 type: string
 *                 description: Tipo da opção
 *               value:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Valores disponíveis para a opção
 *               values:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Valores disponíveis para a opção
 */


/**
 * @swagger
 * /v1/product/search:
 *   get:
 *     summary: Obter uma lista de produtos
 *     tags: [Product]
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
 *           default: name
 *         description: Campos a serem retornados
 *       - in: query
 *         name: match
 *         schema:
 *           type: string
 *         description: Termo para filtrar produtos pelo nome ou descrição
 *       - in: query
 *         name: category_ids
 *         schema:
 *           type: string
 *         description: IDs das categorias para filtrar os produtos
 *       - in: query
 *         name: price-range
 *         schema:
 *           type: string
 *         description: Faixa de preço para filtrar produtos
 *       - in: query
 *         name: option
 *         schema:
 *           type: string
 *         description: Filtro baseado em opções disponíveis dos produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
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
 * /v1/product/{id}:
 *   get:
 *     summary: Obter informações do produto pelo ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Informações do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /v1/product:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados da requisição inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /v1/product/{id}:
 *   put:
 *     summary: Atualizar um produto pelo ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       204:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Dados da requisição inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /v1/product/{id}:
 *   delete:
 *     summary: Deletar um produto pelo ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */


module.exports = router;
