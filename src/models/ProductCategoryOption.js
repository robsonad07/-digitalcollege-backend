const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Category = require('./Category');

const ProductCategoryOption = sequelize.define('product_category_option', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Product.belongsToMany(Category, { through: ProductCategoryOption, foreignKey: 'product_id' });
Category.belongsToMany(Product, { through: ProductCategoryOption, foreignKey: 'category_id' });

module.exports = ProductCategoryOption;
