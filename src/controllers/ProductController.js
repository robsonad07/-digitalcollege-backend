const  Product  = require('../models/Product');
const { Op } = require('sequelize');

const getProducts = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields = 'name,images,price', match, category_ids, 'price-range': priceRange, ...options } = req.query;
    const whereClause = {};

    if (match) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${match}%` } },
        { description: { [Op.iLike]: `%${match}%` } }
      ];
    }

    if (category_ids) {
      whereClause.category_ids = { [Op.contains]: category_ids.split(',').map(Number) };
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      whereClause.price = { [Op.between]: [minPrice, maxPrice] };
    }

    if (options['option']) {
    }

    const products = await Product.findAndCountAll({
      attributes: fields.split(','),
      where: whereClause,
      limit: limit === '-1' ? undefined : parseInt(limit),
      offset: limit === '-1' ? undefined : (parseInt(page) - 1) * parseInt(limit),
    });

    res.json({
      data: products.rows,
      total: products.count,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  } catch (error) {
    console.error('Failed to get products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Failed to get product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

    if (!name || !slug || !price) {
      return res.status(400).json({ error: 'Name, slug, and price are required' });
    }

    const product = await Product.create({ enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options });
    res.status(201).json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({ enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options });
    res.status(204).end();
  } catch (error) {
    console.error('Failed to update product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Failed to delete product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
