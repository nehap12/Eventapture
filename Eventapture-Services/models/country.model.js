/**
 * Created by anasrazafirdousi on 2/9/17.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


var countrySchema = Schema({
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

var Country = mongoose.model('Country',countrySchema);
module.exports.Country = Country;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getCountrys = function (callback, limit) {

    Country.find(callback).limit(limit);

};
