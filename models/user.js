'use strict'
const Sequelize = require('sequelize')

module.exports = {
    name: 'user',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: '用户ID，自增主键'
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            comment: '用户名'
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: '用户密码，加密存储'
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            defaultValue: null,
            comment: '用户邮箱，用于找回密码和通知'
        },
        is_admin: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '是否为管理员，0-否，1-是'
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: '用户创建时间'
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: '用户信息更新时间'
        },
        is_deleted: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: '软删除标志：0表示未删除，1表示已删除'
        },
        membership_expires_at: {
            type: Sequelize.DATE,
            allowNull: false,
            comment: '会员过期时间'
        }
    },
    option: {
        tableName: 'user',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        engine: 'InnoDB',
        comment: '用户信息表'
    }
}