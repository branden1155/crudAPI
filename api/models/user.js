const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const validateEmail = (email) => {
    return (/^\S+@\S+\.\S+$/).test(email)
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: "Email address is required",
        validate: [validateEmail, "Email invalid!"],
    },
    password: {
        type: String,
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }, 
})

userSchema.pre('save', function (next) {
    const user = this;
    if(user.isNew || user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) { return callback(err)}
        callback(null, isMatch);
    })
}



module.exports = mongoose.model('User', userSchema);