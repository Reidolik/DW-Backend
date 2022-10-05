const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    api: {
        port: process.env.API_PORT || 7000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'proyecto-acs.mysql.database.azure.com',
        user: process.env.MYSQL_USER || 'diegomedina',
        password: process.env.MYSQL_PASS || 'Juventus1!',
        database: process.env.MYSQL_DB || 'bd_proyecto_sistemariego',
    }
}