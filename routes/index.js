'use strict';
const express = require('express')
const ProductCtrl = require('../controllers/product')
const api = express.Router()

api.get('/product', ProductCtrl.getProducts)

api.get('/product/:productId', ProductCtrl.getProduct)

api.post('/product', ProductCtrl.postProduct)

api.put('/product/:productId', ProductCtrl.updateProduct)

api.delete('/product/:productId', ProductCtrl.deleteProduct)
module.exports = api