const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    username :{
        type : String,
        required : true
    },
    urlFlag : {
        type :Boolean,
        required : true
    },
    clicks:{
        type : Number,
        required : true,
        default:0
    },
    expiration :{
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('Messages',messageSchema);