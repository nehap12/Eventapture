/**
 * Created by NehaP on 2/26/2017.
 */


var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var users = require('../services/users.service');
var usersService = require('../services/users.service');
var facadeService = require('../services/facade.service');


//////////////////////////
// Single User Routes
//////////////////////////


router.get('/:ID', function(req, res, next){
   var ID = req.params.ID;
   var social = req.query.social;
   var location = req.query.location;

        users.getUser(ID, social, location, function (err, user) {
            if(err) {
                throw err;
            }

            res.json ({
                href: req.hostname + ":" + config.port + req.originalUrl,
                data: user
            });
        })


});

router.patch('/:ID', function(req, res, next) {

    var ID = req.params.ID;
    var updateObject = req.body;

    var social = "";
    var location = "";

    users.updateUser(ID, updateObject, function (err, user) {
        if(err) {
            throw err;
        }

        users.getUser(ID, social, location, function (err, userToBeUpdated) {

            var getUpdatedUser = userToBeUpdated;

            if(err) {
                throw err;
            }

            res.json ({
                href: req.hostname + ":" + config.port + req.originalUrl,
                data: getUpdatedUser
            });

        })

    });
});

router.post('/', function(req, res, next){
   var firstname = req.body.firstName;
   var lastname = req.body.lastName;
   var username = req.body.username;
   var email = req.body.email;
   var dob = req.body.dob;
   var city = req.body.city;
   var country = req.body.country;

   users.createUser(firstname,lastname,username,email,dob,city,country, function (err, user) {
       if(err) {
           /*throw err;*/
           res.json ({
               href: req.hostname + ":" + config.port + req.originalUrl,
               data: null,
               error: err.message
           });
       } else {

           res.json({
               href: req.hostname + ":" + config.port + req.originalUrl,
               data: user
           });
       }
   })

});

router.post('/:ID/hide', function (req,res,next) {
    var userID = req.params.ID;
    var storyID = req.body.storyID;

    facadeService.hideStory(userID,storyID,function (err, result) {
        if(err){
            throw err;
        }

        res.json({
            href: req.hostname + ":" + config.port + req.originalUrl,
            data:result
        });
    });

});

router.post('/:ID/report', function (req,res,next) {
    var userID = req.params.ID;
    var storyID = req.body.storyID;
    var reportReasonID = req.body.reportReasonID;

    facadeService.reportStory(userID,storyID,reportReasonID,function (err, result) {
        if(err){
            throw err;
        }

        res.json({
            href: req.hostname + ":" + config.port + req.originalUrl,
            data:result
        });
    });

});

router.post('/:ID/react', function (req,res,next) {
    var userID = req.params.ID;
    var storyID = req.body.storyID;
    var reactionCategoryID = req.body.reaction.ID;
    var reactionCategoryName = req.body.reaction.name; // Think(anas): If we really want to send names via frontend?

    facadeService.reactToStory(userID,storyID,reactionCategoryID, reactionCategoryName, function (err, result) {
        if(err){
            throw err;
        }

        res.json({
            href: req.hostname + ":" + config.port + req.originalUrl,
            data:result
        });
    });

});


//////////////////////////
// Multiple User Routes
//////////////////////////




module.exports = router;