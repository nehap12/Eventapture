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

var Vote = require('./vote.model').Vote;

//////////////////////////
// Schema
//////////////////////////



var userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        validate:{
            validator: function (v) {
                return /d{10}/.test(v);
            },
            message:'{VALUE} is not a valid 10 digit number!'
        }
    },
    dob:{
        type:Date
    },
    city:{
        type:{
            type:ObjectId,
            ref:'City'
        }
    },
    country:{
        type:{
            type:ObjectId,
            ref:'Country'
        }
    }
});

//////////////////////////
// Export Schema
//////////////////////////

var User = mongoose.model('User',userSchema);
module.exports.User = User;


//////////////////////////
// Export Utilities
//////////////////////////


module.exports.getUsers = function (callback, limit) {

    User.find(callback).limit(limit);

};
