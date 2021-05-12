const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Card extends Model {}

Card.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        event_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        event_description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        event_location_lat: {
          type: DataTypes.STRING,
          allowNull: true
        },
        event_location_lon: {
          type: DataTypes.STRING,
          allowNull: true
        },
        event_city: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        event_state: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        // event_date: {
        //   type: DataTypes.DATE,
        //   allowNull: false,
        //   defaultValue: DataTypes.NOW,
        // },
        event_date: {
          type: DataTypes.DATEONLY,
          get: function() {
            return moment(this.getDataValue('event_date')).format('ll')
          }
        },
        // event_time: {
        //     type: DataTypes.TIME,
        //     allowNull: false,
        //     defaultValue: '06:00:00',
        // },
        event_time: {
          type: DataTypes.TIME,
          get: function() {
            return moment(this.getDataValue('event_time'), "hh:mm:ss").format('hh:mm A');
          }
        },
        image_path: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        category_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'category',
              key: 'id',
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'card',
      }
    );
    
    module.exports = Card;