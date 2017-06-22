/**
 * Created by NehaP on 4/20/2017.
 */


var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');

var ApprovedStory = require('../models/approvedStory.model').ApprovedStory;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    getApprovedStories : function (callback) {

        var query = {
            isMainStory: true,
            isActive: true
        };

        ApprovedStory.find(query, callback);

    },

    createApprovedStory : function (source, region, headline, description, personalityTag, interestTag, relatedStories, video, audio, image, documents, callback) {

        var query = {
            source : source,
            region : region,
            headline : headline,
            description : description ,
            personalityTag : personalityTag,
            interestTag : interestTag,
            relatedStories : relatedStories,
            assets : {
                video : video,
                audio : audio,
                image : image,
                documents : documents
            },
            isActive : true
        };


        ApprovedStory.create(query, callback);

    }
};
