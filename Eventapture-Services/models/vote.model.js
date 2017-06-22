/**
 * Created by anasrazafirdousi on 2/9/17.
 */

//////////////////////////
// Requires
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var VoteAnswer = require('./vote-answers.model').VoteAnswer;

//////////////////////////
// Schema
//////////////////////////


var voteSchema = Schema({
    storyID:{
        type:ObjectId , ref:'Story'
    },
    question:{
        type:String,
        required:true
    },
    answers:[{
        type:ObjectId , ref:'VoteAnswer'
    }]

});


//////////////////////////
// Export Schema
//////////////////////////

var Vote = mongoose.model('Vote',voteSchema,'vote');
module.exports.Vote = Vote;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getVotes = function (callback, limit) {

    Vote.find(callback).limit(limit);

};
