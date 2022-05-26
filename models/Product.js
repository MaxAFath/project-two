// gets out model for sql objects and column types
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// gets bcrypt for secure password management
const bcrypt = require('bcrypt');

// creates our user class as an extension of our sql model
class Product extends Model {}

// sets that tables columns
Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // Table configuration options
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'product'
    }
);

module.exports = Product;