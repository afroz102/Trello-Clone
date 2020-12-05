const mongoose = require('mongoose');

// user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
// User Schema
const boardSchema = new mongoose.Schema({
    
    user: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    lists: {
        type: Array
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);