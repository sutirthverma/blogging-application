const express = require('express');
const PORT = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user_router');
const {
    makeConnection
} = require('./connection');

makeConnection('mongodb://localhost:27017/blogging-app')
.then(() => console.log(`Connected to Database`))

app.set('view engine', 'ejs');
app.set('views', './views');   

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.render('homepage');
})

app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server sarted`));