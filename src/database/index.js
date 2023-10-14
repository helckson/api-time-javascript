const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Time = require('../models/Time');
const Titulo = require('../models/Titulo');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

Time.init(connection);
Titulo.init(connection);
User.init(connection);

Titulo.associate(connection.models);
Time.associate(connection.models);

module.exports = connection;