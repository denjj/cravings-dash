const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      street: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
      state: {
        type: String,
        default: '',
      },
      zip: {
        type: String,
        default: '',
      }
    },
    register_date: {
      type: Date,
      default: Date.now
    },
    preferences: [String],
  });



const User = mongoose.model('User', userSchema);

module.exports = User;