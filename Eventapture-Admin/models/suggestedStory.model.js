/**
 * Created by NehaP  on 2/9/17.
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

var suggestedStorySchema = Schema({
    headline:{
        type:String,
        required:true
    },
    category:{
        ID:{
            type: ObjectId,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    },
    coverImage:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    longDescription:{
        type:String,
        required:true
    },
    region:{
        continent:[ {
            type:ObjectId , ref:'Continent'
        }],
        country:[ {
            type:ObjectId , ref:'Country'
        }],
        state:[ {
            type:ObjectId , ref:'State'
        }],
        city:[ {
            type:ObjectId , ref:'City'
        }]
    },
    source:{
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
    reminderCount:{
        type:Number,
        required:true
    },
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

var SuggestedStory = mongoose.model('SuggestedStory',suggestedStorySchema,'suggestedStories');
module.exports.SuggestedStory = SuggestedStory;
