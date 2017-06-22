/**
 * Created by anasrazafirdousi on 2/11/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var StoryCategory = require('../models/story-category.model').StoryCategory;

//////////////////////////
// Export Utilities
//////////////////////////


module.exports = {
    getStoryCategories : function (callback, limit) {

        var query = {
          is_active: true
        };

        StoryCategory.find(query,callback).limit(limit);

    },
    getStoryCategory : function (id,callback) {

        var query = {
            _id: id
        };

        StoryCategory.findOne(query,callback);

    },
    createStoryCategory : function (title,callback) {

        var query = {
            title:title,
            is_active:true
        };

        StoryCategory.create(query,callback);

    },
    updateStoryCategory : function (id,title,callback){

        var updateQuery = {
            _id:id
        };

        StoryCategory.update(updateQuery,{$set:{title:title}},callback);

    },
    deleteStoryCategory : function (id,callback){

        var deleteQuery = {
            _id:id
        };

        StoryCategory.update(deleteQuery,{$set:{is_active:false}},callback);

    }
};