const mongoose = require('mongoose');

// User Schema
const cardSchema = new mongoose.Schema({
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    },
    title: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Card', cardSchema);