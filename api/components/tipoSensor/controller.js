const TABLA = 'tiposensor'

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
        const sensortype = {
            tipo: body.tipo
        }

        if (body.id_tipo_sensor) {
            sensortype.id_tipo_sensor = body.id_tipo_sensor
        }

        return store.upsert(TABLA, sensortype)
    }

    return {
        list,
        get,
        upsert
    }
}