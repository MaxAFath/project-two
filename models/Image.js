// gets out model for sql objects and column types
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates our user class as an extension of our sql model
class Image extends Model {}

// sets that tables columns
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        file_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id'
            }
        }
    },
    {
        // Table configuration options
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'image'
    }
);

module.exports = Image;