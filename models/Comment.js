const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class Comment extends Model {}

Comment.init({
    content:{
        type:DataTypes.STRING,
    },
    user_id:{
        type:DataTypes.INTEGER, 
        allowNull:false,
    },
    card_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});

module.exports = Comment