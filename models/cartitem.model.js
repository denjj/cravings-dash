const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    name: {type: String, required: true },
    price: {type: Number, required: true },
    image: {type: String, required: true },
    userid: {type: String, required: true },
}); 

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;