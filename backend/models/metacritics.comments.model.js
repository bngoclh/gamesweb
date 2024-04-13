const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metacriticCommentSchema = new Schema({
    game: { type: String},
    commentsList: { type: [String] }
});

const MetacriticComment = mongoose.model("MetacriticComment", metacriticCommentSchema);

module.exports = MetacriticComment;