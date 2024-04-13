const mongoose = require('mongoose');
const argon2 = require('argon2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the user schema
const userSchema = User.schema;

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    const hash = await argon2.hash(user.password);
    user.password = hash;
    next();
});

// Create a model for the users
const User = mongoose.model('User', userSchema);

// Configure the local authentication strategy with Passport.js
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            // Find the user in the database
            const user = await User.findOne({ username });

            // If the user is not found, return an error
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }

            // Verify if the password matches
            const isMatch = await argon2.verify(user.password, password);

            // If the password doesn't match, return an error
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            // If authentication succeeds, return the user
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Serialize the user to store in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Export the necessary modules
module.exports = {
    User,
    passport,
};
