/**
 * Created by NehaP on 3/24/2017.
 */
'use strict';

angular.module('myApp')

    .controller('ListController', ['$scope', '$http', '$location', 'MainService', function($scope,$http, $location,MainService){

        $scope.showStories = true;
        $scope.message = "Loading...";

        $scope.suggestedStories = MainService.getSuggestedStories().query();


        $scope.sendStory = function(story) {
            MainService.sendStory(story);
        };


    $scope.remove = function(object) {
        $http({ 
                url: 'http://ec2-54-219-178-168.us-west-1.compute.amazonaws.com:3001/suggestedStories/'+object,
                method: 'DELETE'
        }).then(function(res) {

        var index = -1;		
		var removeArr = eval( $scope.suggestedStories );
		for( var i = 0; i < removeArr.length; i++ ) {

            console.log(removeArr[i]._id);
			if( removeArr[i]._id === object ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			console.log( "Removed Element" + object);
		}
		$scope.suggestedStories.splice( index, 1 );	
            
        }, function(error) {
            console.log(error);
        });
    };

    $scope.commentPopup = function(object) {
      
        $http.get("http://localhost:3001/suggestedStories/"+object[0])
            .then(function(response) {
                console.log(response+'1');
                
             $scope.id1 = response.data.data.headline;
        });

        $http.get("http://localhost:3001/suggestedStories/"+object[1])
            .then(function(response) {
                
                 console.log(response+'2');
             $scope.id2 = response.data.data.headline;
        });  
    };



    $scope.patchPopup = function(object1, time) {
  
    var parameter = JSON.stringify({count:'15'});
        var res = $http.patch('http://localhost:3001/suggestedStories/'+object1+'/reminder', parameter);
        res.success(function(data, status, headers, config) {
           // $scope.message = data;
            alert( "Timer has been updated to 15 Minutes");

        var index = -1;       
        var removeArr = eval( $scope.suggestedStories );
        for( var i = 0; i < removeArr.length; i++ ) {

            console.log(removeArr[i]._id);
            if( removeArr[i]._id === object1 ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            console.log( "Removed Element" + object);
        }
        $scope.suggestedStories.splice( index, 1 ); 
           
        });
        res.error(function(data, status, headers, config) {
            alert( "Timer has Not been updated to 15 Minutes");
           // alert( "failure message: " + JSON.stringify({data: data}));
        });

    };

    $scope.approvalCall = function(object) {

            var dataSent = JSON.stringify({type:$scope.myCol, username:$scope.region, password:$scope.myCol});

            $http({ 
                url: 'http://localhost:3001/stories', 
                method: 'POST',
                data: dataSent,
                headers: {'Content-Type': 'application/json'}
        }).then(function(res) {
            console.log(res.data);

        }, function(error) {
            console.log(error);
        });
    };


}]);

