/**
 * Created by anasrazafirdousi on 2/9/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


var voteAnswerSchema = Schema({
    answer:{
        type:String,
        required:true
    },
    state:{
        type:Number //if answer is live or not (user suggestion)
    },
    counter:{
        type:Number
    },
    order:{
        type:Number
    },
    is_active:{
        type:Boolean
    }
});


//////////////////////////
// Export Schema
//////////////////////////

var VoteAnswer = mongoose.model('VoteAnswer',voteAnswerSchema,'voteAnswer');
module.exports.VoteAnswer = VoteAnswer;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getVoteAnswers = function (callback, limit) {

    VoteAnswer.find(callback).limit(limit);

};
