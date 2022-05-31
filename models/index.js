const User = require('./User');
const Product = require('./Product');
const Image = require('./Image');

User.hasMany(Product, {
    foreignKey: 'user_id'
});

Product.belongsTo(User, {
    foreignKey: 'user_id'
});

Product.hasMany(Image, {
    foreignKey: 'product_id'
});

Image.belongsTo(Product, {
    foreignKey: 'product_id'
});

module.exports = { User, Product, Image };