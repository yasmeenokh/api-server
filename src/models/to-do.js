'use strict';
const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: {type: String, required: true },
  category: { type: String, required: true},
  url: { type: String},
  price : {type: String, required: true},
  availableQuantity : {type: Number, required: true },
  inCart : {type: Number, required: true},
    
});

const ProductsModel = mongoose.model('Product', ProductsSchema);

module.exports = ProductsModel; 