const express = require('express');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage});

const Router = express.Router();
const {
    handleGetAddBlogPage,
    handleAddBlog
} = require('../controllers/blog_controller');

Router.route('/add')
.get(handleGetAddBlogPage)
.post(upload.single('coverImage'),handleAddBlog)
//.post(handleAddBlog)


module.exports = Router;