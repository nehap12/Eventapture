/**
 * Created by anasrazafirdousi on 2/11/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var StoryReportReasons = require('../models/story-report-reason.model').StoryReportReasons;

//////////////////////////
// Export Utilities
//////////////////////////


module.exports = {
    getStoryReportReasons : function (callback, limit) {

        var query = {
          is_active: true
        };

        StoryReportReasons.find(query,callback).limit(limit);

    }
    // ,
    // getStoryReportReason : function (id,callback) {
    //
    //     var query = {
    //         _id: id
    //     };
    //
    //     StoryReportReason.findOne(query,callback);
    //
    // },
    // createStoryReportReason : function (title,callback) {
    //
    //     var query = {
    //         title:title,
    //         is_active:true
    //     };
    //
    //     StoryReportReason.create(query,callback);
    //
    // },
    // updateStoryReportReason : function (id,title,callback){
    //
    //     var updateQuery = {
    //         _id:id
    //     };
    //
    //     StoryReportReason.update(updateQuery,{$set:{title:title}},callback);
    //
    // },
    // deleteStoryReportReason : function (id,callback){
    //
    //     var deleteQuery = {
    //         _id:id
    //     };
    //
    //     StoryReportReason.update(deleteQuery,{$set:{is_active:false}},callback);
    //
    // }
};