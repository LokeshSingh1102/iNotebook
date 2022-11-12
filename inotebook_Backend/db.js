const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/';

const connToMongo= ()=>{
    mongoose.connect(mongoURL,()=>{
        console.log('connected to mongo');
    })
}

module.exports = connToMongo;