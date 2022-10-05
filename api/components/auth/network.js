const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.post('/login', function (req, res, next) {
    controller.login(req.body.emailPersonal, req.body.contrasenaUsuario)
    .then(token => {
        response.success(req, res, token, 200)
    })
    .catch(next)
})

router.post('/changepassword', function (req, res, next) {
    controller.changePassword(req.body.emailPersonal, req.body.contrasenaUsuarioAnterior, req.body.contrasenaUsuarioNueva)
    .then(token => {
        response.success(req, res, token, 200)
    })
    .catch(next)
})

module.exports = router