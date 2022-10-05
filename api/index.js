const express = require('express')
//const bodyParser = require('body-parser')
const auth = require('./components/auth/network')
const llaves = require('./components/llaves/network')
const puestos = require('./components/puestos/network')
const registroRiego = require('./components/registroriego/network')
const sensor = require('./components/sensor/network')
const tipoSensor = require('./components/tipoSensor/network')
const ubicaciones = require('./components/ubicaciones/network')
const usuarios = require('./components/usuarios/network')
const errors = require('../network/errors')

const config = require('../config')

const app = express()

app.use(express.json())

//cors
app.all('/*', function (req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,X-Client-Time,Authorization');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

//Router
app.use('/api/auth', auth)
app.use('/api/llaves', llaves)
app.use('/api/puestos', puestos)
app.use('/api/registroriego', registroRiego)
app.use('/api/sensor', sensor)
app.use('/api/tiposensor', tipoSensor)
app.use('/api/ubicaciones', ubicaciones)
app.use('/api/usuarios', usuarios)

//tiene que ir de ultimo
app.use(errors)

app.listen(config.api.port, () => {
    console.log(`Servidor alojado en http://localhost:${config.api.port}`)
})