// gets out model for sql objects and column types
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates our user class as an extension of our sql model
class User extends Model {

    // tells us if a given password is correct
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// sets that tables columns
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        address: {
            type: DataTypes.STRING
        }
    },
    {
        // Table configuration options
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;