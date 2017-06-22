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



//////////////////////////
// Schema
//////////////////////////

var userHistorySchema = Schema({
});

//////////////////////////
// Export Schema
//////////////////////////

var UserHistory = mongoose.model('UserHistory',userHistorySchema);
module.exports.UserHistory = UserHistory;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getUserHistory = function (callback, limit) {

    UserHistory.find(callback).limit(limit);

};
