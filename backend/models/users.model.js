const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        //required: true,
        //unique: true,
        sparse: true
    },
    password: {
        type: String,
    },

    admin: {
        type: Boolean,
        default: false
    },

    salt: {
        type: String,
        
      },
      hash: {
        type: String,
       
      }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
