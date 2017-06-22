/**
 * Created by NehaP on 2/26/2017.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


/////////////////
//Schema
////////////////


var userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    location: {
        current: {
            city: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        }
    },
    stories: {
        pin:[ {
            type:ObjectId , ref:'Stories'
        }],
        report:[ {
            storyID: { type:ObjectId , ref:'Stories' },
            reportReasonID : { type:ObjectId, ref:'StoryReportReasons'}
        }],
        hide:[ {
            type:ObjectId , ref:'Stories'
        }],
        react:[{
            storyID: { type:ObjectId , ref:'Stories' },
            reactionCategoryID : { type:ObjectId, ref:'StoryReportReasons'}
        }]
    }
});

//////////////////////////
// Export Schema
//////////////////////////

var users = mongoose.model('users',userSchema,'users');
module.exports.users = users;