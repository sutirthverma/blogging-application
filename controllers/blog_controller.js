const Blog = require("../models/blogs_model");
const Comment = require('../models/comment_model');

async function handleGetBlog(req, res) {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate('createdBy');
    const comments = await Comment.find({blogId: id}).populate('createdBy');    

    return res.render('blog_view', {
        user: req.user,
        blog,
        comments
    });
}

async function handleGetAddBlogPage(req, res) {
    return res.render('addBlog', {
        user: req.user
    });
}

async function handleAddBlog(req, res) {
    const { title, body } = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user.id,
        coverImageUrl: `/uploads/${req.file.filename}`
    })

    return res.redirect(`/blog/view/${blog._id}`);
}

async function handleAddComment(req, res) {
    const { content } = req.body;
    const user = req.user;
    const blogId = req.params.blogId;

    const comment = await Comment.create({
        content,
        createdBy: user.id,
        blogId
    });

    return res.redirect(`/blog/view/${blogId}`);
}

module.exports = {
    handleGetBlog,
    handleGetAddBlogPage,
    handleAddBlog,
    handleAddComment
}