const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    username: {type: String, required: true },
    items: {type: String, required: true },
    shipped: {type: Boolean, required: true },
    totalPrice: {type: Number, required: true },
    date: {type: Date, required: true },
},{
    timestamps: true,
}); 

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;