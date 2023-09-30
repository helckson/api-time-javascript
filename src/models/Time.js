const { Model, DataTypes } = require('sequelize');

class Time extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Titulo, { foreignKey: 'time_id', as: 'titulos'})
    }
}

module.exports = Time;