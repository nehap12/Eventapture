/**
 * Created by anasrazafirdousi on 2/9/17.
 */

//////////////////////////
// Require
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


var citySchema = Schema({
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

var City = mongoose.model('City',citySchema);
module.exports.City = City;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getCitys = function (callback, limit) {

    City.find(callback).limit(limit);

};
