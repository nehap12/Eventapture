/**
 * Created by NehaP on 2/20/2017.
 */

/////////////////
//Requires
////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , objectId = Schema.Types.objectId;

var interest = require('../models/interests.model').interest;

////////////////////
//Export Utilities
///////////////////

module.exports = {
    
    getInterests: function (callback, limit) {

        var query = {
            is_active: true
        };

        interest.find(query,callback).limit(limit);
    },

    getInterest: function(id,callback) {

      var query = {
          _id:id
      };

      interest.findOne(query,callback);
    },

    createInterest: function (title, categoryID, countryID, callback) {

        var query = {
           title:title,
           categoryId:categoryID,
           countryId:countryID,
           is_active: true
        };

        interest.create(query,callback);
    },

    updateInterest: function(id, title, categoryID, countryID, callback) {

        var query = {
            _id:id,
            categoryId:categoryID,
            countryId:countryID
        };

        interest.update(query,{$set:{title:title}},callback);
    },

    deleteInterest: function(id, callback) {

        var query = {
            _id:id
        };

        interest.update(query, {$set:{is_active:false}},callback);

    }



};