'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('MainCtrl', function ($scope, $rootScope, $route, seAPIService, seAuthService, breadcrumbs) {
    
    $rootScope.breadcrumbs = breadcrumbs;
    $rootScope.loggedIn = sessionStorage.accessToken;
    
    $scope.myProfile = []; // Main profile data
    $scope.myBadges = []; // Badges
    $scope.myTimeline = []; // Timeline
    $scope.myFavorites = []; // Favorites
    $scope.tagCloud = []; // Tag cloud
    
    // Login function
    $rootScope.authenticate = function() {
      seAuthService.authenticate($route);
    }
    
    // Gets user profile data for logged-in users.
    if ($rootScope.loggedIn) {
      seAPIService.getMe('').success(function (response) {
        $scope.myProfile = response.items[0];
      });
      
      seAPIService.getMe('badges').success(function (response) {
        $scope.myBadges = response.items;
      });
      
      seAPIService.getMe('timeline').success(function (response) {
        $scope.myTimeline = response.items;
      });
      
      seAPIService.getMe('favorites').success(function (response) {
        $scope.myFavorites = response.items;
      });
    }
    
    // Displays tag cloud based on popular tags.
    seAPIService.getTags().success(function (response) {
      $scope.tagCloud = response.items;
    });
    
  });
  
  