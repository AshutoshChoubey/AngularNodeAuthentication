const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator = require('validator')
// Create the User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true, // Unique index. If you specify `unique: true`
        required: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        min:4,
        max:20,
    },
    status:{
        type:Boolean,
        default:1
    },
    token:{
        type:String,
        default:''
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
const User = mongoose.model('User', UserSchema)

module.exports = User