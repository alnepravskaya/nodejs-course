const path = require('path');
require('dotenv').config({path: __dirname + '/.env' })

const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const {get404} = require("./controllers/error");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findById("644a83ddb2f71c68171421c5").then(user=> {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    }).catch(err => console.log(err))
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);


mongoConnect(() => {
    app.listen(3000);
});



