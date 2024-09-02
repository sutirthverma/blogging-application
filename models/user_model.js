const { createHmac, randomBytes } = require('node:crypto');
const mongoose = require('mongoose');
const {
    createTokenForUser,
} = require('../services/authentication');

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

userSchema.static('matchPasswordAndGenerateToken', async function (email, password){
    const user = await this.findOne({email: email});

    if (!user) throw new Error('Incorrect Password');

    const salt = user.salt;
    
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password');

    const token = createTokenForUser(user);

    return token;
})

const User = mongoose.model('user', userSchema);
module.exports = User;