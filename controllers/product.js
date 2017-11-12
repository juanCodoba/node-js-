'use strict';
const Product = require('../models/product')


function getProduct(id) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion:${err}` })
        if (!product) return res.status(404).send({ message: `el producto no existe` })
        res.status(200).send({ product })
    })

}

function postProduct(req, res) {
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
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion:${err}` })
        if (!products) return res.status(404).send({ message: `el producto no existe` })
        res.send(200, { products })

    })

}

function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) res.status(500).send({ message: `Error al actualizar  el producto ${err}` })
        res.status(200).send({ message: `el producto fue actualizado s` })
    })

}

function deleteProduct(req, res) {

    let productId = req.params.productId
    Product.findById(productId, (err) => {
        if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })

        Product.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })
            res.status(200).send({ message: 'el producto fue eliminado' })

        })

    })

}

module.exports = {
    getProduct,
    postProduct,
    getProducts,
    updateProduct,
    deleteProduct

}