const TABLA = 'llaves'

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
        const sensor = {
            valor: body.tipo,
            id_tipo_sensor: body.id_tipo_sensor,
            id_ubicacion: body.id_ubicacion
        }

        if (body.id_sensor) {
            sensor.id_sensor = body.id_sensor
        }

        return store.upsert(TABLA, sensor)
    }

    return {
        list,
        get,
        upsert
    }
}