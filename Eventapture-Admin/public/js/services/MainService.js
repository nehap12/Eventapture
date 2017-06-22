/**
 * Created by NehaP on 3/25/2017.
 */

'use strict';

angular.module('myApp')

    .constant("baseURL","http://ec2-54-219-178-168.us-west-1.compute.amazonaws.com:3001/")
    .service('MainService', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getSuggestedStories = function () {
            return $resource(baseURL+"suggestedStories/:ID",null,  {'query':{method:'GET', transformResponse: function(data) {
                
                return angular.fromJson(data).data;
            }, isArray:true }});
        };

        var incomingStory = {};

        this.sendStory = function (story) {

            incomingStory = story;

        };

        this.getStory = function () {

            return incomingStory;

        };


        this.saveStory = function (story) {

            console.log("Service: ",story);

        };


       /* this.getSuggestedStory = function () {
            return $resource(baseURL+"suggestedStories/:id",null,  {'update':{method:'PUT' }});
        };*/

}]);