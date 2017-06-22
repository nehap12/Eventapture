/**
 * Created by anasrazafirdousi on 2/10/17.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


var audioCommentSchema = Schema({
    storyID:{  type:ObjectId , ref:'Story'},
    userID:{ type:ObjectId , ref:'User'},
    comment:{ type:String}
});

//////////////////////////
// Export Schema
//////////////////////////

var StoryAudioComments = mongoose.model('StoryAudioComments',audioCommentSchema,'storyVideoComments');
module.exports.StoryAudioComments = StoryAudioComments;

