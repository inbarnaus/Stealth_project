const mongoose = require('mongoose');
// mongoose.set('debug', true);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const dataSchema = new Schema({
    procedure:{
        type: String,
        require:true
    },
    timestamp: {
        type: Number,
        require:true
    },
    value: {
        type: Number,
        require:true
    }
},  { collection: 'data' })

const User = mongoose.model('users', userSchema);
const Data = mongoose.model('data', dataSchema);
// mongoose.model( "data", toDoSchema, "data" );
module.exports = { User, Data };