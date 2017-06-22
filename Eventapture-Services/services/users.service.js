/**
 * Created by NehaP on 2/26/2017.
 */

/////////////////
//Requires
////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var user = require('../models/users.model').users;


//////////////////////////
// Export Utilities
//////////////////////////

module.exports = {

    getUser: function(id, social, location, callback) {

      var query = {
          _id : id
        };

        if((location === "true") && (social === "true")) {

            user.findOne(query, callback);

        } else if(social) {

            user.findOne(query, {location: 0}, callback);

        } else if(location) {

            user.findOne(query, {social: 0}, callback);

        }
        else {

            user.findOne(query, {location: 0, social: 0}, callback);

        }

    },
    
    createUser: function(firstname, lastname, username, email, dob, city, country, callback) {
        var query = {
            firstName:firstname,
            lastName:lastname,
            username:username,
            email:email,
            dob:dob,
            location: {
                current: {
                    city: city,
                    country: country
                }
            }
        };

          user.find({"username":username, "email":email}, function(err, userFound){
            if(userFound){
                callback(new Error("Username or email already exists"));
            }
            else {
                 user.create(query, callback);
            }
        })

    },

    updateUser: function(id, updateObject, callback) {
        var query = {
            _id:id
        };

        user.update(query,{$set:updateObject}, callback);
    },
    
    hideStory: function (userID, storyID, callback) {
        var query = {
            _id:userID
        };

        var updateCommand = {
            $addToSet:{"stories.hide":storyID}
        };

        user.update(query,updateCommand,callback);

    },

    reportStory: function (userID, storyID, reportReasonID, callback) {
        var query = {
            _id:userID
        };

        var storyReasonCombo ={
            storyID:storyID,
            reportReasonID:reportReasonID
        };

        var updateCommand = {
            $addToSet:{"stories.report":storyReasonCombo}
        };

        user.update(query,updateCommand,callback);

    },

    reactToStory: function (userID, storyID, reactionCategoryID, callback) {
        var query = {
            _id:userID
        };

        var storyReactionCombo ={
            storyID:storyID,
            reactionCategoryID:reactionCategoryID
        };

        var updateCommand = {
            $addToSet:{"stories.react":storyReactionCombo}
        };

        user.update(query,updateCommand,callback);

    }

};