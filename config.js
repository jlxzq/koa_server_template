'use strict'

const path = require('path')

module.exports = {
    port: '8080',
    secret: 'secret',
    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, './logs/koa-template.log'),
    datebase: {
        database: '',
        username: '',
        password: '',
        host: '',
        port: 3306
    }
}
