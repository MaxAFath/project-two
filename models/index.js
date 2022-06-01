const User = require('./User');
const Product = require('./Product');
const Image = require('./Image');

User.hasMany(Product, {
    foreignKey: 'user_id'
});

Product.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Product.hasMany(Image, {
    foreignKey: 'product_id'
});

Image.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Product, Image };