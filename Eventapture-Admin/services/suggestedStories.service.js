/**
 * Created by NehaP  on 2/11/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');

var SuggestedStory = require('../models/suggestedStory.model').SuggestedStory;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    getSuggestedStories : function (callback) {

        var query = {
            isMainStory: true,
            isActive: true
        };

        SuggestedStory.find(query, callback);

    },

    getSuggestedStory : function (storyID, callback) {

        var query = {
            _id : storyID,
            isMainStory: true
        };

        SuggestedStory.findOne(query, callback);
    },

    getRelatedStories : function (storyID, callback) {

        var query = {
           _id:storyID,
           isActive: true
        } ;

        SuggestedStory.find(query, callback).select('relatedStories');
    },

    updateReminder : function(storyID, callback){

        var query = {
            _id:storyID
        } ;

        SuggestedStory.update(query, {$set:{reminderCount:15}}, callback);
    },

    deleteSuggestedStory : function (storyID, callback) {

        var query = {
            _id:storyID
        } ;


        SuggestedStory.update(query, {$set:{isActive:false}}, callback);
    }

};
