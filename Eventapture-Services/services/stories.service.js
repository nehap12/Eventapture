/**
 * Created by anasrazafirdousi on 2/11/17.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var commonValidator = require('../validators/common.validator');
var uuid = require('uuid'); // https://github.com/defunctzombie/node-uuid
var multiparty = require('multiparty'); // https://github.com/andrewrk/node-multiparty
var s3 = require('s3'); // https://github.com/andrewrk/node-s3-client

// var AWS = require('aws-sdk');
// var s3 = require('s3');
// var awsS3Client = new AWS.S3();

// var client = s3.createClient({
//     s3Client: awsS3Client,
//     maxAsyncS3: 20,     // this is the default
//     s3RetryCount: 3,    // this is the default
//     s3RetryDelay: 1000, // this is the default
//     multipartUploadThreshold: xxxx, // this is the default (20 MB)
//     multipartUploadSize: xxx, // this is the default (15 MB)
//     s3Options: {
//         accessKeyId: "xxxx",
//         secretAccessKey: "xxx",
//         region: "xxx"
//         // endpoint: 's3.yourdomain.com',
//         // sslEnabled: false
//         // any other options are passed to new AWS.S3()
//         // See: http://docs.aws.amazon.com/xxxx/latest/AWS/Config.html#constructor-property
//     }
// });

//var s3Bucket = new AWS.S3( { params: {Bucket: 'eventapture-test'} } );

var Story = require('../models/story.model').Story;
var StoryTextComments = require('../models/text-comment.model').StoryTextComments;
var StoryVideoComments = require('../models/video-comment.model').StoryVideoComments;
//var StoryPictureComments = require('../models/').StoryVideoComments;
var StoryAudioComments = require('../models/audio-comment.model').StoryAudioComments;
var Vote = require('../models/vote.model').Vote;
var VoteAnswer = require('../models/vote-answers.model').VoteAnswer;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    getStories : function (page,callback) {

        var isValidPagination = commonValidator.validatePagination(page);

        if(isValidPagination){
            Story.find({},callback).sort('-publication_date').skip(parseInt(page.offset)).limit(parseInt(page.limit));
        }

    },
    createApprovedStory : function (headline,category, coverImage, shortDescription, longDescription, region, source, tag, image, video, audio, documents, publication_date,  callback) {
        var query = {
            title : headline,
            category: {
                ID: category.id,
                name: category.name
            },
            coverImage : coverImage,
            shortDescription: shortDescription,
            longDescription: longDescription,
            region : {
                continent: region.continent,
                country: region.country,
                state: region.state,
                city: region.city
            },
            source : {
                author: source.author,
                agency: source.agency
            },
            tag: {
                storyTag: "xxx",
                personalityTag: tag.interestTag,
                eventTag: "xxx"
            },
            pictures : image,
            videos : video,
            audios : audio,
            documents : documents,
            publication_date: publication_date,
            isActive : true
        };


        Story.create(query, callback);

    },
    getStory : function (id,callback) {

        var query = { _id: id};
        Story.findOne(query,callback);

    },
    saveStories : function (callback, limit) {
        //TODO(anas):  change saveStory to createStory for consistency
        Story.find(callback).limit(limit);

    },
    preGenerateStory : function (callback) {

        var query = {
            title:" ",
            category:{
                ID:" ",
                name:" "
            },
            coverImage:" ",
            shortDescription:" ",
            longDescription:" ",
            publication_date:new Date().toISOString()
        };

        Story.create(query,callback);

    },
    getStoryTextComments : function (storyID,page,callback) {

        var query = {
            storyID:storyID
        };

        console.log('Callinng Story.find(query,callback);', query);

        StoryTextComments.find(query,callback).skip(parseInt(page.offset)).limit(parseInt(page.limit));

    },
    getStoryVideoComments : function (storyID,page,callback) {

        var query = {
            storyID:storyID
        };

        console.log('Callinng Story.find(query,callback);', query);

        StoryVideoComments.find(query,callback).skip(parseInt(page.offset)).limit(parseInt(page.limit));

    },
    getStoryAudioComments : function (storyID,page,callback) {

        var query = {
            storyID:storyID
        };

        console.log('Callinng Story.find(query,callback);', query);

        StoryVideoComments.find(query,callback).skip(parseInt(page.offset)).limit(parseInt(page.limit));

    },
    getPictures:function (id,callback) {
        var query = {
            _id : id
        };
        var projection = {
            pictures:1
        };

        Story.findOne(query,projection,callback)
    },
    getVideos:function (id,callback) {
        var query = {
            _id : id
        };
        var projection = {
            videos:1
        };

        Story.findOne(query,projection,callback)
    },
    getAudios:function (id,callback) {
        var query = {
            _id : id
        };
        var projection = {
            audios:1
        };

        Story.findOne(query,projection,callback)
    },
    getDocuments:function (id,callback) {
        var query = {
            _id : id
        };
        var projection = {
            documents:1
        };

        Story.findOne(query,projection,callback);
    },
    getTotalStoryCount:function (callback) {
        return Story.count({},callback);
    },


    postComment:function (storyID,userID,comment,callback) {

        var query = {
            storyID: storyID,
            userID: userID,
            comment:comment
        };

        StoryTextComments.create(query,callback);
    },
    postPicture:function (storyID,imageFile,callback) {

        var query = {
            _id:storyID
        };

        var updateCommand = {
                  $addToSet: { pictures: imageFile }
        };

        Story.update(query,updateCommand,callback);

    },
    postVideo:function (storyID,videoFile,callback) {

    },

    hideStory: function (storyID,callback) {
        var query = {
            _id:storyID
        };

        var updateCommand = {};
        updateCommand['$inc'] = {};
        updateCommand['$inc']['counter.hide'] = 1;

        Story.update(query,updateCommand,callback);

    },
    reportStory: function (storyID,callback) {
        var query = {
            _id:storyID
        };

        var updateCommand = {};
        updateCommand['$inc'] = {};
        updateCommand['$inc']['counter.report'] = 1;

        Story.update(query,updateCommand,callback);

    },
    reactToStory: function (storyID, reactionCategoryID, reactionCategoryName, callback) {
        var query = {
            _id:storyID
        };

        var counter = ['counter','.','reaction','.',reactionCategoryName].join('');

        var updateCommand = {};
        updateCommand['$inc'] = {};
        updateCommand['$inc'][counter] = 1;

        Story.update(query,updateCommand,callback);

    },

    createVoteAnswers : function (answer, callback) {

       VoteAnswer.create(answer, callback);
    },

    updateVoteAnswers: function (answer, callback) {

      VoteAnswer.update(answer, {$set:{is_active:true}}, callback);
    },

    createVote : function (storyID, question, callback) {

        var query = {
            storyID: storyID,
            question: question
        };

        Vote.create(query, callback);
    },

    addAnswers : function (voteID, answer, callback) {
        var query = {
            _id: voteID
        };

        var update = {
            $addToSet:{"answers":answer}
        };

        Vote.update(query, update, callback);
    },

    createAnswers: function (answer, state, counter, order, callback) {
        var queryForAnswers = {
            answer: answer,
            state: state,
            counter: counter,
            order: order,
            is_active: true
        };

        VoteAnswer.create(queryForAnswers, callback);
    },

    deactivateAnswer: function (answerID, callback) {
        var query = {
            _id: answerID
        };

        VoteAnswer.update(query, {$set:{is_active:false}}, callback);
    },

    deleteAnswer: function (voteID, answerID, callback) {
        var query = {
            _id: voteID
        };

        Vote.update(query,{$pull:{"answers":answerID}}, callback)
    }

};
