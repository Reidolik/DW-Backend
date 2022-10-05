const mysql = require('mysql')
const config = require('../config')

const dbconf = {
    connectionLimit: 100,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let pool = mysql.createPool(dbconf)

function handleConnection() {}

handleConnection()

function list(table) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (errcon, connection) {
            if (errcon) {
                return errcon
            }
            connection.query(`SELECT * FROM ${table}`, (err, data) => {
                connection.release()
                if (err) return reject(err)
                resolve(data);
            })
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (errcon, connection) {
            if (errcon) {
                return errcon
            }
            connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
                connection.release()
                if (err) return reject(err)
                resolve(data)
            })
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (errcon, connection) {
            if (errcon) {
                return errcon
            }
            connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
                connection.release()
                if (err) return reject(err)
                resolve(result)
            })
        })
    })
}

function update(table, data) {
    let propNames = Object.getOwnPropertyNames(data);
    for (let i = 0; i < propNames.length; i++) {
        let propName = propNames[i];
        if (data[propName] === null || data[propName] === undefined) {
            delete data[propName];
        }
    }
    return new Promise((resolve, reject) => {
        pool.getConnection(function (errcon, connection) {
            if (errcon) {
                return errcon
            }
            connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
                connection.release()
                if (err) return reject(err);
                resolve(result);
            })
        })
    })
}

async function upsert(table, data) {
    let row = -1
    if (data.id) {
        row = await get(table, data.id);
    }
    if (row.length === 0 || !data.id) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (errcon, connection) {
            if (errcon) {
                return errcon
            }
            connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
                connection.release()
                if (err) return reject(err);
                resolve(res[0] || null);
            })
        })
    })
}

// funciones especiales
function getSensorData(id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (errcon, connection) {
            if (errcon) {
                return errcon
            }
            connection.query(`SELECT * FROM Tabla WHERE id = '${id}'`, (err, data) => {
                connection.release()
                if (err) return reject(err)
                resolve(data)
            })
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
    getSensorData
}