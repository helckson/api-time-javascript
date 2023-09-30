const { json } = require('sequelize');
const Time = require('../models/Time')

module.exports = {
    async index(req, res) {
        
        try {
            const times = await Time.findAll();
            return res.json(times);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },
    
    async create(req, res) {
        const { nome } = req.body;

        try {
            const time = await Time.create({ nome });
            return res.status(201).json(time);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },
    
    async findById(req, res) {
        const { id } = req.params;

        try {
            const time = await Time.findByPk(id, {
                include: {association: 'titulos'}
            });
    
            if(!time) {
                return res.status(404).json({message: 'Time não encontrado'});
            }
    
            return res.json(time);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },
    
    async delete(req, res) {
        const { idTime } = req.params;

        try {
            const time = await Time.findByPk(idTime);

            if(!time) {
                return res.status(404).json({message: 'Time não encontrado'});
            }

            await Time.destroy({
                where: {
                    id: time.id
                }
            });

            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },

    async update(req, res) {
       const { idTime } = req.params;
       const { nome } = req.body;

        try {
            const time = await Time.findByPk(idTime);

            if(!time) {
                return res.status(404).json({message: 'Time não encontrado'});
            }
            
            await Time.update({ nome }, {
                where: {
                    id: time.id
                }
            });

            return res.json({message: 'Time atualizado com sucesso'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
}