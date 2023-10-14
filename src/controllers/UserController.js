const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    async create(req, res) {
        try {
            const { username, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                password: hashedPassword
            });

            const token = jwt.sign({ id: user.id}, 'secret', {expiresIn: '1h'});

            res.json({token});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao registrar usuário.' });
        }
    },
    async login(req, res) {
        try {
            const {username, password } = req.body;

            const user = await User.findOne({where: { username }});

            if(!user) {
                return res.status(404).json({message: 'Usuário não encontrado'})
            };

            const passwordMatch = await bcrypt.compare(password, user.password);

            if(!passwordMatch) {
                return res.status(401).json({message: 'Senha incorreta'})
            }

            const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

            res.json({token});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao autenticar usuário.' });
        }
    }
}
