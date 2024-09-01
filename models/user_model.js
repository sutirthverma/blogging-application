const { createHmac, randomBytes } = require('node:crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    salt:{
        type: String,
    },
    password: {
        type: 'String',
        required: true
    },
    profileImage: {
        type: String,
        default: '../public/userProfile.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {timestamps: true});


//Hashing password before saving user in db
userSchema.pre('save', function (next){
    
    const user = this;

    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;