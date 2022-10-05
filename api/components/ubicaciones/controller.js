const TABLA = 'ubicaciones'

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
        const user = {
            sector: body.sector
        }

        if (body.id_ubicacion) {
            user.id_ubicacion = body.id_ubicacion
        }

        return store.upsert(TABLA, user)
    }

    return {
        list,
        get,
        upsert
    }
}