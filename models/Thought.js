const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
        get: (date) => dayjs(date).format('MM/DD/YYYY'),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;