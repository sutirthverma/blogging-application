const mongoose = require('mongoose');

async function makeConnection(path){
    await mongoose.connect(path);
}

module.exports = {
    makeConnection
}