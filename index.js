'use strict'

const config = require('./config')
const mongoose = require('mongoose')
const app = require('./app')


// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.get('/hola/:name', (req, res) => {
//     res.send({ message: `hola ${ req.params.name}!` })
// })



mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`conexion con mongo no establecida ${err}`)

    }
    console.log('conexion con mongo establecida ')
})


app.listen(config.port, () => {
    console.log(`api rest corriendo en el servidor http://localhost:${config.port}`)
})