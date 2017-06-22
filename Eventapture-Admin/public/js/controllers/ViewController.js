/**
 * Created by NehaP on 3/25/2017.
 */

angular.module('myApp')

    .controller('ViewController',['$scope', '$http','$routeParams', 'MainService', function($scope, $http, $routeParams, MainService) {


        var Story = MainService.getStory();


        $scope.category = ["Sports", "Business", "Politics"];cd
        $scope.suggestedStory = Story;

        $scope.headline = Story.headline;
        $scope.description = Story.description;
        $scope.source = Story.source;
        $scope.personalitytag1 = Story.personalityTag[0] +"," + Story.personalityTag[1] +"," + Story.personalityTag[2];
        $scope.intresttag1 = Story.interestTag[0] +"," + Story.interestTag[1] +"," + Story.interestTag[2];
        $scope.relatedStory1 = Story.relatedStories[0];
        $scope.relatedStory2 = Story.relatedStories[1];
        $scope.relatedStory3 = Story.relatedStories[2];
        $scope.region = Story.region;
       
        $scope.audio1 =Story.assets.audio[0];
        $scope.audio2 =Story.assets.audio[1];
        $scope.audio3 =Story.assets.audio[2];
        $scope.video1 =Story.assets.video[0];
        $scope.video2 =Story.assets.video[1];
        $scope.video3 =Story.assets.video[2];
        $scope.image1 =Story.assets.image[0];
        $scope.image2 =Story.assets.image[1];
        $scope.image3 =Story.assets.image[2];
        //$scope.document1 =Story.assets.documents[0];
        //$scope.document2 =Story.assets.documents[1];
        //$scope.document3 =Story.assets.documents[2];


        $scope.startTheStory = function () {

            MainService.saveStory(story);
        };

      
        $scope.startdata = function (object) {

        		  var parameter = JSON.stringify({"story" :{
                        "headline" : $scope.headline,
                         "category" : {
                         "id" : Story._id,
                         "name" : $scope.selectedCategory
                        },
    "coverImage" : "http://img.bleacherreport.net/img/images/photos/003/658/904/hi-res-c3fe86a93ef9b86204e838a5ea74eb55_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top",
    "shortDescription" : $scope.shortdescription,
    "longDescription" : $scope.longdescription,
    "region" : {
        "continent" : [ 
            "589fa0f518ae0d4d5cd34683"
        ],
        "country" : [ 
            "589fa18218ae0d4d5cd34686"
        ],
        "state" : [ 
            "589fa5ba598cd25454fc24a3", 
            "589fa5bb598cd25454fc24c3"
        ],
        "city" : [ 
            "589fa4f9598cd25454fc20d1", 
            "589fa4f9598cd25454fc20c4"
        ]
    },
    "source" : {
        "author" : "589fa7a9598cd25454fc24dc",
        "agency" : "589fa72a598cd25454fc24d8"
    },
    "tag" : {
        "personalityTag" : [ 
           Story.personalityTag[0], Story.personalityTag[1], Story.personalityTag[2]
        ], 
        "intrestTag" : [ 
           Story.interestTag[0], Story.interestTag[1], Story.interestTag[2]
        ]
    },
     "image" : [ 
           $scope.image1, $scope.image2,  $scope.image3
        ],
        "video" : [ 
            $scope.video1, $scope.video2,  $scope.video3
        ],
        "audio" : [
                $scope.audio1,$scope.audio2,$scope.audio3
        ],
        "documents" : [
             $scope.document1,$scope.document2,$scope.document3
        ],
        "publication_date":  $scope.assignedDate,
        "isActive":"true"
}
});
    
        var res = $http.post('http://localhost:3000/stories', parameter);
        res.success(function(data, status, headers, config) {
            //$scope.message = data;
            //alert( "success message: " + JSON.stringify({data: data}));  
            alert( "Success Message: " + $scope.shortdescription+ " Successfully Approved");
 
            
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

    
           
        };
}]);


/*get({id:$routeParams.ID});*/