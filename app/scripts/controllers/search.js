'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:SearchCtrl
 * @description
 * # AboutCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('SearchCtrl', function ($scope, $rootScope, seAPIService, $routeParams, $location) {
  
    $rootScope.loggedIn = sessionStorage.accessToken;
    
    $scope.tags = [];
    $scope.searchQuestions = [];
    $scope.selectedTag = [];
    
    seAPIService.getTags().success(function (response) {
      $scope.tags = response.items;
    });
    
    seAPIService.search($routeParams.tag).success(function (response) {
        $scope.searchQuestions = response.items;
    });
    
    // Set the select for tags to the current path.
    $scope.selectedTag.name = $routeParams.tag;
    
    // Change the path to the value of selectTag when changed.
    $scope.selectTag = function(selectedTag) {
      if (selectedTag) {
        $location.path('/search/tag/'+selectedTag.name);
      } else {
        $location.path('/search/tag/'); 
      }
    };

  });
