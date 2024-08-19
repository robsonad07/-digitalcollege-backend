const Category = require('../models/Category.js');

const getCategories = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;
    const whereClause = {};

    if (use_in_menu !== undefined) {
      whereClause.use_in_menu = use_in_menu === 'true';
    }

    const categories = await Category.findAndCountAll({
      attributes: fields.split(','),
      where: whereClause,
      limit: limit === '-1' ? undefined : parseInt(limit),
      offset: limit === '-1' ? undefined : (parseInt(page) - 1) * parseInt(limit),
    });

    res.json({
      data: categories.rows,
      total: categories.count,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  } catch (error) {
    console.error('Failed to get categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Failed to get category by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    const category = await Category.create({ name, slug, use_in_menu });
    res.status(201).json(category);
  } catch (error) {
    console.error('Failed to create category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.update({ name, slug, use_in_menu });
    res.status(204).end();
  } catch (error) {
    console.error('Failed to update category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Failed to delete category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
