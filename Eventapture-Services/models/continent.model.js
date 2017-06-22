/**
 * Created by anasrazafirdousi on 2/9/17.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


var continentSchema = Schema({
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

var Continent = mongoose.model('Continent',continentSchema);
module.exports.Continent = Continent;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getContinents = function (callback, limit) {

    Continent.find(callback).limit(limit);

};



