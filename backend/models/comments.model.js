const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  game: { type: String},
  comment: { type: String},
  author: { type: String},

  //username: { type: String, sparse: true,  },
  
});

commentSchema.plugin(passportLocalMongoose);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
