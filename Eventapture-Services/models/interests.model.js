/**
 * Created by NehaP on 2/20/2017.
 */

/////////////////
//Requires
////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


/////////////////
//Schema
////////////////

var interestSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: ObjectId,
        ref: 'StoryCategory',
        required: true
    },
    countryId: {
        type: ObjectId,
        ref: 'country',
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    }

});

/////////////////
//Export Schema
////////////////

var interest = mongoose.model('interests',interestSchema,'interests');
module.exports.interest = interest;