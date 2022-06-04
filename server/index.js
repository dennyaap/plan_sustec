require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models  = require('./models/models');
const cors = require('cors');

const router = require('./routes/index'); //импортируем основной роутер, который связывает все остальные

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const app = express();

const path = require('path');

app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING!!!'})
})




const start = async () => {
    try {
        await sequelize.authenticate(); //подключение к бд
        await sequelize.sync(); //сверяет состояние базы данных со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e) {
        console.log(e)
    }
}

start();