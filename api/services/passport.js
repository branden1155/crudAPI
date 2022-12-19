const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

const localOptions = {
    usernameField: 'email'
}

const localStrategy = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
        if (err) {return done(err)}
        if(!user) { return done(null, false) }
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err)}
            if(!isMatch) { return done(null, false)}
            return done(null, user);
        })
    })
})

const jwtOptions = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

const JwtStrategies = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub, function(err, user){
        if(err) return done(err, false);
        if(user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})

passport.use(JwtStrategies)
passport.use(localStrategy)