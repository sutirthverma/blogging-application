const express = require('express');
const PORT = 8000;
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Blog = require('./models/blogs_model');

//Routers
const userRouter = require('./routes/user_router');
const blogRouter = require('./routes/blog_router');

const {
    makeConnection
} = require('./connection');
const { checkForAuthCookie } = require('./middlewares/auth_middleware');

makeConnection('mongodb://localhost:27017/blogging-app')
.then(() => console.log(`Connected to Database`))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthCookie('token'));
app.use(express.static(path.resolve('./public')));

//Homepage
app.get('/',  async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.render('homepage', {
        user: req.user,
        blogs: allBlogs
    });
})

app.use('/user', userRouter);
app.use('/blog', checkForAuthCookie('token'), blogRouter);

app.listen(PORT, () => console.log(`Server sarted`));