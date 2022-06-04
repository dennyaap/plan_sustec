const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/models');

const generateJwt = (id, login, fullName, role) => {
    return jwt.sign(
        {id, login, fullName, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    ); // ОБЪЕКТ payload - данные о пользователе | секретный ключ | опции сколько живет токен
}

class UserController {
    async registration(req, res, next){
        const {login, password, fullName, role} = req.body;

        if(!login || !password){
            return next(ApiError.badRequest('Некорректный логин или пароль'));
        }

        const candidate = await User.findOne({ where: { login } });

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ login, password: hashPassword, fullName, role });
        // const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.login, user.fullName, user.role);
        return res.json({ token });
    }   
    async login(req, res, next){
        const {login, password} = req.body;
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.internal('Не правильный пароль'));
        }
        const token = generateJwt(user.id, user.login, user.fullName, user.role);
        return res.json({token});
    }
    async check(req, res, next){ //сгенерировать новый токен и отправить его обратно на клиент
        const token = generateJwt(req.user.id, req.user.login, req.user.fullName, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController();