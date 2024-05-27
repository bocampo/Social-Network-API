const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        Date: Date,
        /**************************** */
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
        comments: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],
    }
});

postSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;