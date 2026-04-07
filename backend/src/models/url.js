const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    longUrl: {
        type: String,
        required: true,
        index: true   
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const URL = mongoose.model("url", urlSchema);
module.exports = URL;