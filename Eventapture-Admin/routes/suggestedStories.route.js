/**
 * Created by NehaP on 2/9/17.
 */

///////////////////////
// Require
///////////////////////

var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config/dev.config.json');
var SuggestedStoriesService = require('../services/suggestedStories.service');

///////////////////////
// Routes
///////////////////////

    router.get('/', function(req, res, next) {

        SuggestedStoriesService.getSuggestedStories(function (err, suggestedStories) {
           if(err) {
               throw err;
           }

           res.json({
              href:req.hostname + ":" + config.port + req.originalUrl,
              data:suggestedStories
           });

        })

    });

    router.get('/:ID', function(req, res, next) {

        var storyID = req.params.ID;

        SuggestedStoriesService.getSuggestedStory(storyID, function (err, story) {
           if(err) {
               throw err;
           }

           if(story.isActive){
               res.json({
                   href:req.hostname + ":" + config.port + req.originalUrl,
                   data:story
               });
           } else {
               res.json({
                   href:req.hostname + ":" + config.port + req.originalUrl
               });
           }

        })

    });


    router.get('/:ID/relatedStories', function (req, res, next) {

        var storyID = req.params.ID;

        SuggestedStoriesService.getRelatedStories(storyID, function (err, relatedStories) {
            if(err) {
                throw err;
            }


            res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:relatedStories
            });

        })
    });


    router.patch('/:ID/reminder', function (req, res, next) {

        var storyID = req.params.ID;

        SuggestedStoriesService.updateReminder(storyID, function (err, story) {
            if(err) {
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:story
            });
        })
    });


    router.delete('/:ID', function (req, res, next) {

        var storyID = req.params.ID;


            SuggestedStoriesService.deleteSuggestedStory(storyID, function (err, storyDeleted) {
                if(err) {
                    throw err;
                }


                SuggestedStoriesService.getSuggestedStory(storyID, function (err, storyToBeDeleted) {

                    var toBeDeleted = storyToBeDeleted;

                    if(err) {
                        throw err;
                    }

                    res.json({
                        href:req.hostname + ":" + config.port + req.originalUrl,
                        data:storyToBeDeleted
                    });
            })

        });

    });

module.exports = router;
