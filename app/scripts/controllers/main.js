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
    
    $scope.myProfile = [];
    $scope.myBadges = [];
    $scope.myTimeline = [];
    $scope.myFavorites = [];
    $scope.tagCloud = [];
    
    $rootScope.authenticate = function() {
      seAuthService.authenticate($route);
    }
    
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
    
    seAPIService.getTags().success(function (response) {
      $scope.tagCloud = response.items;
    });
    
  });
  
  