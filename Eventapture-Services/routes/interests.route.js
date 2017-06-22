/**
 * Created by NehaP on 2/20/2017.
 */

var express = require('express');
var router = express.Router();
var config = require('../config/dev.config.json');
var interest = require('../services/interests.service');

////////////////////////////
// Multiple Interests Routes
////////////////////////////

    router.get('/', function(req, res, next){

        interest.getInterests(function(err, interests){
            if(err) {
                throw err;
            }

            res.json ({
                href:req.hostname + ":" + config.port + req.originalUrl,
                interests:interests
            });
        })
    });


    router.post('/', function(req, res, next){
        var title = req.body.title;
        var cID = req.body.categoryId;
        var countryID = req.body.countryId;

        interest.createInterest(title,cID,countryID,function(err, interest){
            if(err){
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                interest:interest
            })
        })
    });


//////////////////////////
// Single Interests Routes
//////////////////////////


    router.get('/:ID', function(req, res, next){
        var ID = req.params.ID;

        interest.getInterest(ID, function(err, interest){
            if(err){
                throw err;
            }


            if(interest.is_active) {
                res.json({
                    href: req.hostname + ":" + config.port + req.originalUrl,
                    interest: interest
                });
            } else {
                res.json({
                    href: req.hostname + ":" + config.port + req.originalUrl
                });
            }
        })

    });

    router.put('/:ID', function(req, res, next) {
        var ID = req.params.ID;
        var title = req.body.title;
        var categoryID = req.body.categoryId;
        var countryID = req.body.countryId;

        interest.updateInterest(ID, title, categoryID, countryID, function (err) {
            if (err) {
                   throw err;
            }

            interest.getInterest(ID, function (err, interestToBeUpdated) {

                var toBeUpdated = interestToBeUpdated;

                if (err) {
                    throw err;
                }

                res.json({
                    href: req.hostname + ":" + config.port + req.originalUrl,
                    interest: toBeUpdated
                });
            })
        });

    });

        router.delete('/:ID', function (req, res, next) {
            var ID = req.params.ID;

            interest.getInterest(ID, function (err, interestToBeDeleted) {

                var toBeDeleted = interestToBeDeleted;

                if (err) {
                    throw err;
                }

                interest.deleteInterest(ID, function (err) {
                    if (err) {
                        throw err;
                    }

                    res.json({
                        href: req.hostname + ":" + config.port + req.originalUrl,
                        deletedInterest: toBeDeleted
                    });
                })

            });


        });

    module.exports = router;
