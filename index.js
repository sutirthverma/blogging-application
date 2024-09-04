const express = require('express');
const PORT = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user_router');
const blogRouter = require('./routes/blog_router');
const bodyParser = require('body-parser');

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

app.get('/',  (req, res) => {
    return res.render('homepage', {
        user: req.user
    });
})

app.use('/user', userRouter);
app.use('/blog', checkForAuthCookie('token'), blogRouter);

app.listen(PORT, () => console.log(`Server sarted`));