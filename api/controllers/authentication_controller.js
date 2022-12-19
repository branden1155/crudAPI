const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


const tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.jwtSecret);
}

exports.signin = (req, res, next) => {
    const user = req.user;
    res.send({token: tokenForUser(user), user_id: user._id})
}

exports.signup = (req, res, next) => {
    const {
        email,
        password,
    } = req.body;
    if(!email ||!password){
        return res.status(422).json({ error: "Please provide your email and password!"})
    }

    User.findOne({email: email}, (err, exisitingUser) => {
        if (err) { return next(err)}
        if (exisitingUser) { return res.status(422).json({ error: "Email already exists!"})}

        const user = new User({
            email: email,
            password: password,
        })

        user.save((err) => {
            if (err) { return next(err)}
            res.json({user_id: user._id, token: tokenForUser(user)})
        })
    })
}