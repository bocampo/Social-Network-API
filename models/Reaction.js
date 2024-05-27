const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => new Date(createdAt).toDateString() // Format timestamp on query
    }
});

module.exports = mongoose.model('Reaction', reactionSchema);