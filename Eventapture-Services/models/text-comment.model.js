/**
 * Created by anasrazafirdousi on 2/9/17.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


var textCommentSchema = Schema({
    storyID: {  type:ObjectId , ref:'Story'},
    userID: { type:ObjectId , ref:'User'},
    comment: { type:String}
});

//////////////////////////
// Export Schema
//////////////////////////

var StoryTextComments = mongoose.model('StoryTextComments',textCommentSchema,'storyTextComments');
module.exports.StoryTextComments = StoryTextComments;

