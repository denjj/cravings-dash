const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    name: {type: String, required: true },
    price: {type: Number, required: true },
    image: {type: String, required: true },
    restaurantid: {type: String, required: true },
    tag: [String]
}); 

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;