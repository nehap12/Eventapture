/**
 * Created by NehaP on 4/20/2017.
 */


///////////////////////
// Require
///////////////////////

var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config/dev.config.json');
var ApprovedStoriesService = require('../services/approvedStories.service');

///////////////////////
// Routes
///////////////////////

    router.get('/', function(req, res, next) {

        ApprovedStoriesService.getApprovedStories(function (err, suggestedStories) {
            if(err) {
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:suggestedStories
            });

        })

    });

    router.post('/', function (req, res, next) {

        var source = req.body.source;
        var region = req.body.region;
        var headline = req.body.headline;
        var description = req.body.description;
        var personalityTag = req.body.personalityTag;
        var interestTag = req.body.interestTag;
        var relatedStories = req.body.relatedStories;
        var video = req.body.video;
        var audio = req.body.audio;
        var image = req.body.image;
        var documents = req.body.documents;


        ApprovedStoriesService.createApprovedStory(source, region, headline, description, personalityTag, interestTag, relatedStories, video, audio, image, documents, function (err, approvedStory) {
            if(err) {
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:approvedStory
            })
        })

    });



module.exports = router;
