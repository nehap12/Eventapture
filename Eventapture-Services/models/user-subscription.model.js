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

var Story = require('./story.model').Story;

//////////////////////////
// Schema
//////////////////////////

var userSubscriptionSchema = Schema({
    storyList:[{
        type:ObjectId , ref:'Story'
    }],
    communityList:[{
        type:ObjectId , ref:'Community'
    }]
});

//////////////////////////
// Export Schema
//////////////////////////

var UserSubscription = mongoose.model('UserSubscription',userSubscriptionSchema);
module.exports.UserSubscription = UserSubscription;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getUserSubscriptions = function (callback, limit) {

    UserSubscription.find(callback).limit(limit);

};
