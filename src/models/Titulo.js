const { Model, DataTypes } = require('sequelize');

class Titulo extends Model {
    static init(sequelize) {
        super.init({
            campeonato: DataTypes.STRING,
            ano: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Time, { foreignKey: 'time_id', as: 'time' });
    }
}

module.exports = Titulo;