const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {type: String, required: true },
    theme: {type: String, required: true },
    description: {type: String, required: true },
    menu: [String]
},{
    timestamps: true,
}); 

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;