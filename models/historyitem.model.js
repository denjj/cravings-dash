const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historyItemSchema = new Schema({
    name: {type: String, required: true },
    price: {type: Number, required: true },
    image: {type: String, required: true },
    userid: {type: String, required: true },
    date: { type: Date, required: true },
}); 

const HistoryItem = mongoose.model('HistoryItem', historyItemSchema);

module.exports = HistoryItem;