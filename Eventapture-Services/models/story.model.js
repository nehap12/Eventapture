/**
 * Created by anasrazafirdousi on 2/9/17.
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

var Vote = require('./vote.model').Vote;

//////////////////////////
// Schema
//////////////////////////

var storySchema = Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        ID:{
            type:String,
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
        author:{
            type:ObjectId,
            ref:'User'
            //required:true  //TODO: breaking this rule just to test pregen
        },
        agency:{
            ID:String
        }
    },
    tag:{
        storyTag:{
            type:[String]
        },
        personalityTag:{
            type:[String]
        },
        eventTag:{
            type:[String]
        }
    },
    counter:{
        impression:{
            type:Number
        },
        share:{
            type:Number
        },
        textComment:{
            type:Number
        },
        audioComment:{
            type:Number
        },
        videoComment:{
            type:Number
        },
        reaction:{
            like:{
                type:Number
            },
            dislike:{
                type:Number
            },
            hate:{
                type:Number
            },
            love:{
                type:Number
            },
            sad:{
                type:Number
            },
            happy:{
                type:Number
            },
            funny:{
                type:Number
            }
        },
        hide:Number,
        report:Number

    },
    flags:{
        isTop:Boolean,
        isTrending:Boolean
    },
    vote:[ {
        type:ObjectId , ref:'Vote'
    }],
    publication_date:{
        type:Date
       // required:true  //for testing
    },
    pictures:[{
        type:String
    }],
    videos:[{
        type:String
    }],
    audios:[{
        type:String
    }],
    documents:[{
        type:String
    }]


});


//////////////////////////
// Export Schema
//////////////////////////

var Story = mongoose.model('Story',storySchema,'stories');
module.exports.Story = Story;
