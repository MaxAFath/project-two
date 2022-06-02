// gets out model for sql objects and column types
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates our user class as an extension of our sql model
class Purchase extends Model {}

// sets that tables columns
Purchase.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id'
            },
            unique: true
        }
    },
    {
        // Table configuration options
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'purchase'
    }
);

module.exports = Purchase;