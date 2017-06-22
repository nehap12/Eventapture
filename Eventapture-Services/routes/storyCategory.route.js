
///////////////////////
// Require
///////////////////////


var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config/dev.config.json');
var StoryCategory = require('../services/story-category.service');


///////////////////////
// Variables
///////////////////////

// Connection logic has been moved to ../db/db

// mongoose.connect('mongodb://localhost/eventapture');
//var db = mongoose.connection;

///////////////////////
// Multiple Story Category Routes
///////////////////////


    router.get('/',function(req, res, next) {

        StoryCategory.getStoryCategories(function (err,storyCategories) {
            if(err){
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                storyCategories:storyCategories
            });
        })
    });

    router.post('/',function(req,res,next) {
        var title = req.body.title;

        StoryCategory.createStoryCategory(title,function(err,storyCategory){
            if(err){
                throw err;
            }
            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                StoryCategory: storyCategory
            });
        })

    });

///////////////////////
// Single Story Category Routes
///////////////////////

    router.get('/:ID',function(req,res,next){
        var ID = req.params.ID;

        StoryCategory.getStoryCategory(ID, function (err,storyCategory) {
            if(err){
                throw err;
            }
            if(storyCategory.is_active) {
                res.json({
                    href: req.hostname + ":" + config.port + req.originalUrl,
                    storyCategory: storyCategory
                });
            } else {
                res.json({
                    href: req.hostname + ":" + config.port + req.originalUrl
                });
            }
        })
    });

    router.put('/:ID',function(req,res,next) {
        var ID = req.params.ID;
        var title = req.body.title;

        StoryCategory.updateStoryCategory(ID, title,function (err,storyCategory) {
            if (err) {
                throw err;
            }
            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                StoryCategory:storyCategory
            });
        })
    });

    router.delete('/:ID',function(req,res,next){
        var ID = req.params.ID;

        StoryCategory.deleteStoryCategory(ID, function(err,storyCategory){
            if (err){
                throw err;
            }
            res.json({
               href:req.hostname + ":" + config.port + req.originalUrl,
                StoryCategory:storyCategory
            });
        })
    });

module.exports = router;