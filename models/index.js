const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');    //引用sequelize模块
const config = require('../config').datebase;    //引用数据库配置文件
const { logger } = require('../middlewares/logger')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false,
        freezeTableName: true,
    }
})

const db = {
    sequelize: sequelize,
    models: {}
}

sequelize.authenticate().then(() => {
    logger.info("mysql is opened");
}).catch(err => {
    logger.error(new Error(err));
});


// 整合models文件下的其他js文件
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    }).forEach(function (file) {
        const modelFile = require(path.join(__dirname, file));
        db.models[modelFile.name] = sequelize.define(modelFile.name, modelFile.schema, modelFile.option);
    });

// 根据name选择model
db.getModel = function (name) {
    return this.models[name];
};

db.getModel('user').beforeCreate((user, options) => {
    user.membership_expires_at = new Date(user.created_at.getTime() + 3 * 24 * 60 * 60 * 1000);
    return true;
})

module.exports = db;