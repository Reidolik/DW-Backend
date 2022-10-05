const auth = require('../auth')
const { nanoid } = require('nanoid')
const TABLA = 'usuarios'
const bcrypt = require('bcrypt')

module.exports = function (injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/mysql')
    }

    function list() {
        return store.list(TABLA)
    }

    function get(id) {
        return store.get(TABLA, id)
    }

    async function upsert(body) {
        let type = ''
        const user = {
            nombre_usuario: body.nombre_usuario,
            contrasena: body.contrasena,
            id_puesto: body.id_puesto
        }

        if (body.id) {
            user.id_usuario = body.id_usuario
            type = 'Update'
        } else {
            user.id_usuario = nanoid()
            user.contrasena = await bcrypt.hash(body.contrasena, 5)
            type = 'Creation'
        }

        if (body.contrasena) {
            let contrasenaUsuario = ''
            if (type === 'Update') {
                contrasenaUsuario = await bcrypt.hash(body.contrasena, 5)
                user.contrasena = contrasenaUsuario
            }

            if (type === 'Creation') {
                contrasenaUsuario = user.contrasena
            }
            await auth.upsert({
                id: user.id_usuario,
                emailPersonal: user.emailPersonal,
                contrasenaUsuario: contrasenaUsuario
            })
        }

        return store.upsert(TABLA, user)
    }

    return {
        list,
        get,
        upsert
    }
}