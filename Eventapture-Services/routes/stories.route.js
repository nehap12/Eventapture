/**
 * Created by anasrazafirdousi on 2/9/17.
 */

///////////////////////
// Require
///////////////////////

var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config/dev.config.json');
var StoriesService = require('../services/stories.service');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var originalname = file.originalname;
        var extension = originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length-1];
        cb(null, filename);
    }
});

function fileFilter (req, file, cb){
    var type = file.mimetype;
    var typeArray = type.split("/");
    if (typeArray[0] == "video" || typeArray[0] == "image") {
        cb(null, true);
    }else {
        cb(null, false);
    }
}

var upload = multer({storage: storage, dest: "uploads/", fileFilter: fileFilter});


///////////////////////
// Variables
///////////////////////

// Connection logic has been moved to ../db/db

// mongoose.connect('mongodb://localhost/eventapture');
// var db = mongoose.connection;

///////////////////////
// Routes
///////////////////////


///////////////////////
// Multiple Story Routes
///////////////////////

    router.get('/', function(req, res, next) {

        //First 25 records as default
        var defaultLimit = {
            "offset": 0,
            "limit": 25
        };

        var page = Object.keys(req.query).length?req.query:defaultLimit;
        StoriesService.getStories(page,function (err,stories) {
           if(err){
               throw err;
           }

           StoriesService.getTotalStoryCount(function (err,count) {

               res.json({
                   href:req.hostname + ":" + config.port + req.originalUrl,
                   count:count,
                   offset:parseInt(page.offset),
                   limit:parseInt(page.limit),
                   stories:stories

               });

           });

        });

    });


///////////////////////
// Single Story Routes
///////////////////////

        ///////////////////////
        // Single Story Detail Route
        ///////////////////////

        router.get('/:ID', function(req, res, next) {

            // res.json({
            //     href:req.hostname + ":" + config.port + req.originalUrl
            // });

            var ID = req.params.ID;

            StoriesService.getStory(ID,function (err,story) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    story:story
                });

            });

        });

        router.post('/:ID', function(req, res, next) {

            // The ID gets pre-generated when the user launches the 'Start a Story Page'
            // both on eventapture.com OR on approval tool OR any other internal tool
            // so the user will know the Story ID ahead of actually posting the story
            // hence /:ID in route

            res.json({
                status:201,
                href:req.hostname + ":" + config.port + req.originalUrl,
                message:'New Story Created'
            });

        });

        ///// Single Approved Story Route ////

        router.post('/', function (req, res, next) {

            var story = req.body.story;

            StoriesService.createApprovedStory(story.headline, story.category, story.coverImage, story.shortDescription, story.longDescription, story.region, story.source, story.tag, story.image, story.video, story.audio, story.documents, story.publication_date, function (err, approvedStory) {

                if(err) {
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:approvedStory
                })
            })

        });

        //ROUTE to pregenerate a story without any information.
        //On evnetapture.com it is used whenever story create page opens before user has entered anything
        // Also used whenever story create page opens on internal admin tools
        //User gets the pregenerated story ID back and then post story information versus that ID
        router.get('/pregen/story',function (req,res,next) {

            StoriesService.preGenerateStory(function (err,story) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    story:story
                });
            });
        });

        ///////////////////////
        // Single Story  Focused Routes
        ///////////////////////

        router.get('/:ID/textcomments', function(req, res, next) {

            var storyID = req.params.ID;

            //First 25 records as default
            var defaultLimit = {
                "offset": "0",
                "limit": "25"
            };

            var page = Object.keys(req.query).length?req.query:defaultLimit;

             StoriesService.getStoryTextComments(storyID,page,function (err,textComments) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    textComments:textComments
                });
            });

        });

        router.post('/:ID/textcomment', function(req, res, next) {

            var storyID = req.params.ID;
            var userID = req.body.userID;
            var comment = req.body.comment;

            //console.log(userID,comment);

            StoriesService.postComment(storyID,userID,comment,function (err,comment) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    body:req.body,
                    comment:comment
                });

            });


        });

        router.get('/:ID/videocomments', function(req, res, next) {

            var storyID = req.params.ID;

            //First 25 records as default
            var defaultLimit = {
                "offset": "0",
                "limit": "25"
            };

            var page = Object.keys(req.query).length?req.query:defaultLimit;

            StoriesService.getStoryVideoComments(storyID,page,function (err,textComments) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    videoComments:textComments
                });
            });


        });

        router.post('/:ID/videocomment', function(req, res, next) {
            res.send('video comment posted');
        });

        router.get('/:ID/audiocomments', function(req, res, next) {

            var storyID = req.params.ID;

            //First 25 records as default
            var defaultLimit = {
                "offset": "0",
                "limit": "25"
            };

            var page = Object.keys(req.query).length?req.query:defaultLimit;

            StoriesService.getStoryAudioComments(storyID,page,function (err,textComments) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    audioComments:textComments
                });
            });

        });

        router.post('/:ID/audiocomments', function(req, res, next) {
            res.send('audio comment posted');
        });

        router.get('/:ID/pictures', function(req, res, next) {

            var storyID = req.params.ID;
            StoriesService.getPictures(storyID,function (err,pictures) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    pictures:pictures
                });
            });

        });

        router.get('/:ID/pictures/:pictureID', function(req, res, next) {

            res.json({message:"here is URL of the pic..."});

        });


        router.post('/:ID/pictures',upload.single('photo'), function(req, res, next) {

            // TODO:Code refactoring required
            //
            //
            // // Task 46,47,48,49 rnd project
            // // 1. Upload picture to Amazon S3 and get the URL
            // // 2. Save the URL in MongoDB
            // // 3. Send the success response back to user with saved URL
            //
            //res.json({"filename": req.file.filename, "type": req.file.mimetype});

            //

            var imageFile = req.file.filename;
            var storyID = req.params.ID;

            StoriesService.postPicture(storyID,imageFile,function (err) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl + "/" + filename,
                    filename: filename,
                    type: req.file.mimetype
                });

            });

        });

        router.get('/:ID/videos', function(req, res, next) {
            StoriesService.getVideos(req.params.ID,function (err,videos) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    pictures:videos
                });
            });
        });

        router.post('/:ID/video', function(req, res, next) {

            // Task 46,47,48,49 rnd project
            // 1. Upload video to Amazon S3 and get the URL
            // 2. Save the URL in MongoDB
            // 3. Send the success response back to user with saved URL

            var storyID = req.params.ID;

            StoriesService.postVideo(storyID,req,function (err,video) {
                res.send('video saved to : ' + url);
            });


        });

        router.get('/:ID/audios', function(req, res, next) {
            StoriesService.getAudios(req.params.ID,function (err,audios) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    audios:audios
                });
            });
        });

        router.post('/:ID/audio', function(req, res, next) {

            // Task 46,47,48,49 rnd project
            // 1. Upload audio to Amazon S3 and get the URL
            // 2. Save the URL in MongoDB
            // 3. Send the success response back to user with saved URL

            res.send('audio saved');
        });

        router.get('/:ID/documents', function(req, res, next) {

            StoriesService.getDocuments(req.params.ID,function (err,documents) {
                if(err){
                    throw err;
                }

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    documents:documents
                });
            });
        });

        router.post('/:ID/document', function(req, res, next) {

            // Task 46,47,48,49 rnd project
            // 1. Upload document to Amazon S3 and get the URL
            // 2. Save the URL in MongoDB
            // 3. Send the success response back to user with saved URL

            res.send('document saved');
        });

        router.get('/:ID/counter', function(req, res, next) {
            res.send({
                share:105234,
                textComment:4235436,
                    audioComment:7213,
                videoComment:99232,
                reaction:{
                    like:24523,
                    dislike:72332,
                    hate:234,
                    love:72,
                    sad:43254361,
                    happy:432625712,
                    funny:14324
                }
            });
        });

        router.post('/:ID/counter/share', function(req, res, next) {
            res.send('share counter updated');
        });

        router.post('/:ID/counter/reaction', function(req, res, next) {
            res.send('reaction counter updated');
        });

        /*router.get('/:ID/votes', function(req, res, next) {
            res.send({
                votes:[
                    {
                        question:" Do you think its good for immigrant?",
                        answer:[
                            {
                                answer: "fsdgfsdgdfs fdgfdsgfds  fdgdsgfd",
                                state: 1, // Answer is Live (people can vote on it)
                                counter: 435354435
                            },
                            {
                                answer:"cvntryqwe vfwgfdas qbacdsf",
                                state:1, // Answer is Live (people can vote on it)
                                counter:8454
                            }
                        ]
                    }
                ]
            });
        });*/


        router.post('/:ID/votes', function (req, res, next) {
            var storyID = req.params.ID;
            var question = req.body.question;
            var answers = req.body.answers;

            StoriesService.createVote(storyID, question, function (err, vote){

                if(err) {
                    throw err;
                }


                var voteID = vote._id;

                answers.forEach(function (object, index) {
                    StoriesService.createVoteAnswers(object, function (err, answer) {

                        StoriesService.updateVoteAnswers(object, function (err, updatedAnswer) {
                           if(err) {
                               throw err;
                           }


                            StoriesService.addAnswers(voteID, answer._id, function (err, vote) {
                                if(err) {
                                    throw err;
                                }

                            });

                        });

                    });
                });

               /* res.json({
                   href:
                });*/

            });

        });


        router.delete('/:ID/votes/:answerID', function (req, res, next) {
            var storyID = req.params.ID;
            var answerID = req.params.answerID;


            StoriesService.getStory(storyID, function (err, story) {
                if(err) {
                    throw err;
                }

                var voteID = story.vote.toString();



            StoriesService.deactivateAnswer(answerID, function (err, answer) {
                if(err){
                    throw err;
                }

                StoriesService.deleteAnswer(voteID, answerID, function (err, deleteAnswer) {
                  if(err) {
                      throw err;
                  }

                });

                res.json({
                    href:req.hostname + ":" + config.port + req.originalUrl,
                    data:answer
                });

            });

            });

        });


        router.patch('/:ID/votes/suggest', function (req, res, next) {
            var voteID = req.body.voteID;
            var answer = req.body.answer;

            StoriesService.createAnswers(answer.answer, answer.state, answer.counter, answer.order, function(err, answer){
                if(err) {
                    throw err;
                }

                StoriesService.addAnswers(voteID, answer._id, function (err, suggestedAnswer) {
                    if(err) {
                        throw err;
                    }

                    res.json({
                        href:req.hostname + ":" + config.port + req.originalUrl,
                        data:suggestedAnswer
                    });

                });
            });

        });



            router.post('/:ID/votes/:answerID', function(req, res, next) {

                res.send('vote counter updated for answer with ID: ' + req.params.answerID);
            });

            router.get('/:ID/rating', function(req, res, next) {
                res.send('Story ID :'+ req.params.ID +' Rating: 8.9');
            });

            router.post('/:ID/react', function () {

            });

module.exports = router;
