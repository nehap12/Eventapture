/**
 * Created by anasrazafirdousi on 2/9/17.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var Continent = require('./continent.model').Continent;
var Country = require('./country.model').Country;
var State = require('./state.model').State;
var City = require('./city.model').City;

var Story = require('./story-category.model').Story;

//////////////////////////
// Schema
//////////////////////////

var communitySchema = Schema({
    title:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    www:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    stories:[{
        type:ObjectId , ref:'Story'
    }]
});

//////////////////////////
// Export Schema
//////////////////////////

var Community = mongoose.model('Community',communitySchema);
module.exports.Community = Community;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getUsers = function (callback, limit) {

    Community.find(callback).limit(limit);

};
