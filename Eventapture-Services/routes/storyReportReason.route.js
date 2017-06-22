
///////////////////////
// Require
///////////////////////


var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config/dev.config.json');
var StoryReportReason = require('../services/story-report-reason.service');


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

        StoryReportReason.getStoryReportReasons(function (err,storyReportReasons) {
            if(err){
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                storyReportReasons:storyReportReasons
            });
        })
    });

    // router.post('/',function(req,res,next) {
    //     var title = req.body.title;
    //
    //     StoryReportReason.createStoryReportReason(title,function(err,storyCategory){
    //         if(err){
    //             throw err;
    //         }
    //         res.json({
    //             href:req.hostname + ":" + config.port + req.originalUrl,
    //             StoryReportReason: storyCategory
    //         });
    //     })
    //
    // });

///////////////////////
// Single Story Category Routes
///////////////////////

    // router.get('/:ID',function(req,res,next){
    //     var ID = req.params.ID;
    //
    //     StoryReportReason.getStoryReportReason(ID, function (err,storyCategory) {
    //         if(err){
    //             throw err;
    //         }
    //         if(storyCategory.is_active) {
    //             res.json({
    //                 href: req.hostname + ":" + config.port + req.originalUrl,
    //                 storyCategory: storyCategory
    //             });
    //         } else {
    //             res.json({
    //                 href: req.hostname + ":" + config.port + req.originalUrl
    //             });
    //         }
    //     })
    // });
    //
    // router.put('/:ID',function(req,res,next) {
    //     var ID = req.params.ID;
    //     var title = req.body.title;
    //
    //     StoryReportReason.updateStoryReportReason(ID, title,function (err,storyCategory) {
    //         if (err) {
    //             throw err;
    //         }
    //         res.json({
    //             href:req.hostname + ":" + config.port + req.originalUrl,
    //             StoryReportReason:storyCategory
    //         });
    //     })
    // });
    //
    // router.delete('/:ID',function(req,res,next){
    //     var ID = req.params.ID;
    //
    //     StoryReportReason.deleteStoryReportReason(ID, function(err,storyCategory){
    //         if (err){
    //             throw err;
    //         }
    //         res.json({
    //            href:req.hostname + ":" + config.port + req.originalUrl,
    //             StoryReportReason:storyCategory
    //         });
    //     })
    // });

module.exports = router;