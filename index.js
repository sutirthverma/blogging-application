const express = require('express');
const PORT = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');    

app.listen(PORT, () => console.log(`Server is sarted`));