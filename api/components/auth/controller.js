const bcrypt = require('bcrypt')
const auth = require('../../../auth')
const TABLA = 'auth'

module.exports = function (injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/mysql')
    }

    async function login(emailPersonal, contrasenaUsuario) {
        const data = await store.query(TABLA, { emailPersonal: emailPersonal })
        return bcrypt.compare(contrasenaUsuario, data.contrasenaUsuario)
            .then(sonIguales => {
                if (sonIguales === true) {
                    //generar token
                    return auth.sign({ id: data.id })
                } else {
                    throw new Error('Información invalida')
                }
            })
    }

    async function changePassword(emailPersonal, contrasenaUsuarioAnterior, contrasenaUsuarioNueva) {
        const data = await store.query(TABLA, { emailPersonal: emailPersonal })
        let newPassword = await bcrypt.hash(contrasenaUsuarioNueva, 5)
        return bcrypt.compare(contrasenaUsuarioAnterior, data.contrasenaUsuario)
            .then(sonIguales => {
                if (sonIguales === true) {
                    return store.changePassword(TABLA, emailPersonal, newPassword)
                } else {
                    throw new Error('Información invalida')
                }
            })
    }

    async function upsert(data) {
        const authData = {
            id: data.id
            //idColaborador: 1
        }

        if (data.emailPersonal) {
            authData.emailPersonal = data.emailPersonal
        }

        if (data.contrasenaUsuario) {
            authData.contrasenaUsuario = data.contrasenaUsuario
            //authData.contrasenaUsuario = data.contrasenaUsuario
        }

        return store.upsert(TABLA, authData)
    }

    return {
        login,
        upsert,
        changePassword
    }
}