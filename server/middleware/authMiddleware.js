const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if(req.method == "OPTIONS"){
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer dfgdg - тип | токен
        if(!token) {
            res.status(401).json({message: 'Не авторизован'})
        }
        //если токен есть
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        next(); //вызываем следующим middleware
        
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}