const { Schema, mongoose } = require("mongoose");

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('users', (UserSchema));