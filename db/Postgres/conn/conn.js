require('dotenv').config({ path: 'src/.env.prod' })
require('dotenv').config({ encoding: 'latin1' })

const { Sequelize } = require('sequelize');
const Connection = () => {
    try {
        const SSL_DB = process.env.SSL_DB === 'true' ? true : undefined
        const SSL_DB_REJECT = process.env.SSL_DB_REJECT === 'false' ? false : undefined
        let dialectOptions = {}
        if (SSL_DB) {
            dialectOptions = {
                ssl: {
                    require: SSL_DB,
                    rejectUnauthorized: SSL_DB_REJECT,
                }
            };
        };
        
        const conn = new Sequelize(process.env.URLP, {
            dialect: 'postgres',
            host: 'localhost',
            logging: false,
            ssl: process.env.SSL_DB,
            dialectOptions
        });

        return conn
    } catch (e) { return e }

}

module.exports = Connection()
