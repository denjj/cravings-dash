const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose
    .connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected... '))
    .catch(err => console.log(err));

app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/restaurants', require('./routes/api/restaurants'));
app.use('/api/menuitems', require('./routes/api/menuitems'));
app.use('/api/cartitems', require('./routes/api/cartitems'));
app.use('/api/historyitems', require('./routes/api/historyitems'));
app.use('/api/tags', require('./routes/api/tags'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})