const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator = require('validator')
// Create the User Schema
const CollectionSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
       // unique: true, // Unique index. If you specify `unique: true`
        required: true,
       // lowercase: true,
    },
    descripition: {
        type: String,
        required: true,
        min:4,
        max:20,
    },
    status:{
        type:Boolean,
        default:1
    },
    tasklist:{
        type : Array , 
        default : [] ,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: null
    },
    deletedDate: {
        type: Date,
        default: null
    }
});
const Task = mongoose.model('Task', CollectionSchema)

module.exports = Task