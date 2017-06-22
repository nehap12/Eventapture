'use strict';


$(function(){
    $('.showinfo').click(function(e){
        e.preventDefault();
        $(this).closest('td').find(".test").toggle();
    });
});


var app = angular.module('myApp', ['ngRoute','ngResource']);

app.config(function($routeProvider,$locationProvider) {

$routeProvider
    .when('/', {
        templateUrl : './views/main.html',
        controller: 'ListController'
    })
    .when('/suggestedStory/:ID', {
        templateUrl : './views/view.html',
        controller : 'ViewController'
    })
    .when('/startstory', {
        templateUrl : './views/startstory.html',
        controller : 'ViewController'
    })
});

app.directive('popup', function() {
  return {
    templateUrl: "./views/popup.html"
  };
});

app.directive('modal', function() {
  return {
    templateUrl: "../views/modal.html"
  };
});

app.directive('search', function() {
  return {
    templateUrl: "./views/search.html"
  };
});


/*app.controller('ListController', ['$scope','$http', function ($scope, $http) {
 /!*  $scope.tagline = "Welcome to listController";
 $http.get('http://localhost:3001/suggestedStories')
 .success(function (data) {
 $scope.data = data;
 console.log($scope.data);
 })
 .error(function (err) {
 alert("Error!!!");
 });*!/

 }]);*/
/*angular.module('myApp', ['ngRoute', 'appRoutes', 'ListController', 'MainService']);*/


//var app = angular.module('myapp', ['ngRoute','ngResource']);



// app.controller('dropdownCtrl', function ($scope) {
  
// })


/*
app.controller('ListController', function($scope, $http) {

 function DefaultCtrl($scope) {
 $http.get("countryData.json")
    .then(function (response) {$scope.names = response.data.records;});

}

angular.module('ListController', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});


    $http.get("http://localhost:3001/suggestedStories")
    .then(function (response) {$scope.suggestedStories = response.data;});
            console.log($scope.suggestedStories);
            $scope.addNew = function(personalDetail){
            $scope.suggestedStories.push({ 
                'fname': "", 
                'lname': "",
                'email': "",
            });
        };

        $scope.change = function (selectedID) {
    alert($scope.value);
    console.log($scope.value);
  }


  $scope.querySearch = function (query) {
  $http({
    url: 'countryData.json',
    method: 'GET',
    params: { sSearchText: query }
  }).success(function (data, status, headers, config) {
    $scope.items = data;
  });
}
    
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.suggestedStories, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.suggestedStories = newDataList;
        };

   

    $scope.itemList = [];
    $scope.blisterPackTemplates = [{id:1,name:"15"},{id:2,name:"30"},{id:3,name:"45"}];

  $scope.changedValue = function(item) {
    $scope.itemList.push(item.name);
    console.log( $scope.item.name);
  }   

    

});*/

