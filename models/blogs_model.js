const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,   
        default: '../public/blog_default.png'
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, {timestamps: true});

const Blog = new mongoose.model('blogs', blogSchema);

module.exports = Blog;