const { Schema, mongoose } = require("mongoose");

const VidImageSchema = new Schema({
    category: { type: String, required: true },
    fileType: { type: String, required: true },
    desc: { type: String, required: true },
    user: { type: Object, required: true },
    userslikes: [{ type: String, required: false }],
    usersaves: [{ type: String, required: false }],
    userscomments: [{ type: Object, required: false }],
    date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('vidimages', (VidImageSchema));