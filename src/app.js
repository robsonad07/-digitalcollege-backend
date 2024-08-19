const express = require('express');
const setupSwagger = require('./config/swagger');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const ProductImage = require('./models/ProductImage');
const ProductOption = require('./models/ProductOption');
const ProductCategoryOption = require('./models/ProductCategoryOption');

const app = express();
app.use(express.json());

setupSwagger(app);
app.use('/v1', userRoutes);
app.use('/v1', categoryRoutes);
app.use('/v1', productRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

module.exports = app;
