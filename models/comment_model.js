const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Types.ObjectId,
        ref: 'blogs'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
}, {timestamps: true})

const Comment = new mongoose.model('comments', commentSchema);

module.exports = Comment;