const Time = require('../models/Time');
const Titulo = require('../models/Titulo');

module.exports = {
    async create(req, res) {
        const { time_id } = req.params;
        const { campeonato, ano } = req.body;

        try {
            const time = await Time.findByPk(time_id);

        if(!time) {
            return res.status(404).json({error: 'Time não encontrado'});
        }

        const titulo = await Titulo.create({
            campeonato,
            ano,
            time_id
        });

        return res.status(201).json(titulo);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },

    async findForOne(req, res) {
        const { idTitulo } = req.params;

        try {
            const titulo = await Titulo.findByPk(idTitulo);

            if(!titulo) {
                return res.status(404).json({message: 'Titulo não encontrado'})
            }

            return res.json(titulo);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },

    async delete(req, res) {
        const { idTitulo } = req.params; 

        try {
            const titulo = await Titulo.findByPk(idTitulo);

            if(!titulo) {
                return res.status(404).json({message: 'Titulo não encontrado'})
            }

            await Titulo.destroy({
                where: {
                    id: titulo.id
                }
            });
            
            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },

    async update(req, res) {
        const { idTitulo } = req.params;
        const { campeonato, ano } = req.body;

        try {
            const titulo = await Titulo.findByPk(idTitulo);

            if(!titulo) {
                return res.status(404).json({message: 'Titulo não encontrado'})
            }

            await Titulo.update({ campeonato, ano}, {
                where: {
                    id: titulo.id
                }
            });

            return res.json({message: 'Titulo atualizado com sucesso'});

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
}