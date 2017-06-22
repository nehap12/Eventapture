/**
 * Created by anasrazafirdousi on 2/9/17.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


var stateSchema = Schema({
    title:{
        type:String,
        required:true
    },
    code:{
        type:Number
    }
});

//////////////////////////
// Export Schema
//////////////////////////

var State = mongoose.model('State',stateSchema);
module.exports.State = State;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getStates = function (callback, limit) {

    State.find(callback).limit(limit);

};
