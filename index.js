'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 302
const Product = require('./models/product')
const mongoose = require('mongoose')




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/hola/:name', (req, res) => {
    res.send({ message: `hola ${ req.params.name}!` })
})

app.get('/api/product', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion:${err}` })
        if (!products) return res.status(404).send({ message: `el producto no existe` })
        res.send(200, { products })

    })
})

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion:${err}` })
        if (!product) return res.status(404).send({ message: `el producto no existe` })
        res.status(200).send({ product })
    })

})

app.post('/api/product', (req, res) => {
    // console.log(req.body)
    // res.status(200).send({ message: 'El producto se a recibido ' })
    console.log('POST /api/product')
    console.log(req.body)
    let product = new Product()

    product.name = req.body.name
    product.picture = req.body.picture,
        product.price = req.body.price,
        product.category = req.body.category,
        product.description = req.body.description



    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `error al guardas en la base de datos: ${err}` })
        res.status(200).send({ product: productStored })
    })
})

app.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) res.status(500).send({ message: `Error al actualizar  el producto ${err}` })
        res.status(200).send({ message: `el producto fue actualizado s` })
    })
})

app.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    Product.findById(productId, (err) => {
        if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })

        Product.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })
            res.status(200).send({ message: 'el producto fue eliminado' })

        })

    })
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if (err) {
        return console.log(`conexion con mongo no establecida ${err}`)

    }
    console.log('conexion con mongo establecida ')
})


app.listen(port, () => {
    console.log(`api rest corriendo en el servidor http://localhost:${port}`)
})