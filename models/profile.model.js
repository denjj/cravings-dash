const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
}
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;