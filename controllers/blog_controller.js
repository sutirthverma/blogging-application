const Blog = require("../models/blogs_model");

async function handleGetAddBlogPage(req, res) {
    return res.render('addBlog', {
        user: req.user
    });
}

async function handleAddBlog(req, res) {
    console.log(`Boddyyyy:: ${JSON.stringify(req.body)}`);
        
    const { coverImage, title, body } = req.body;

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageUrl: `/public/uploads/${req.file.filename}`
    })

    // await Blog.create({
    //     title: title,
    //     body: body,
    //     createdBy: req.user._id
    // })

    return res.redirect(`blog/${blog._id}`);
}

module.exports = {
    handleGetAddBlogPage,
    handleAddBlog
}