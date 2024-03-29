'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const userServices = require('../services').user
const { InvalidQueryError } = require('../lib/error')
const login = {}
login.login = async (ctx, next) => {
    const { username } = ctx.request.body
    if (!username) {
        throw new InvalidQueryError()
    }
    const user = await userServices.login({
        username: username
    })
    if (!user) {
        ctx.result = ''
        ctx.msg = '用户不存在'
    } else {

        ctx.result = {
            userInfo: user,
            token: jwt.sign({
                data: user,
                // 设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
            }, config.secret)
        }
    }
    return next()
}

module.exports = login