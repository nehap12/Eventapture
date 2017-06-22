/**
 * Created by NehaP on 4/20/2017.
 */



//////////////////////////
// Requires
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var Continent = require('./continent.model').Continent;
var Country = require('./country.model').Country;
var State = require('./state.model').State;
var City = require('./city.model').City;


//////////////////////////
// Schema
//////////////////////////

var approvedStorySchema = Schema({
    source:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    headline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    personalityTag:[{
        type:String,
        required:true
    }],
    interestTag:[{
        type:String,
        required:true
    }],
    relatedStories:[{
        type:ObjectId,
        required:true
    }],
    assets:{
        video:[ {
            type:String
        }],
        audio:[ {
            type:String
        }],
        image:[ {
            type:String
        }],
        city:[ {
            type:String
        }]
    },
    isMainStory:{
        type:Boolean
    },
    isActive:{
        type:Boolean
    }
});


//////////////////////////
// Export Schema
//////////////////////////

var ApprovedStory = mongoose.model('ApprovedStory',approvedStorySchema,'approvedStories');
module.exports.ApprovedStory = ApprovedStory;
