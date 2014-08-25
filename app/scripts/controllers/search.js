'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:SearchCtrl
 * @description
 * # AboutCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('SearchCtrl', function ($scope, $rootScope, $route, $routeParams, $location, seAPIService, seAuthService, breadcrumbs) {
  
    $rootScope.breadcrumbs = breadcrumbs;
    $rootScope.loggedIn = sessionStorage.accessToken;
    
    // API result set
    $scope.tags = [];
    $scope.searchQuestions = [];
    
    // Form inputs
    $scope.selectedTag = [];
    $scope.selectedOrder = [];
    $scope.selectedSort = [];
    $scope.orders = ['asc', 'desc'];
    $scope.sorts = ['activity', 'votes', 'creation', 'relevance'];
    
    $rootScope.authenticate = function() {
      seAuthService.authenticate($route);
    }
    
    seAPIService.getTags().success(function (response) {
      $scope.tags = response.items;

      var foundTags = $.grep($scope.tags, function(e) {
        return e.name == $routeParams.tag; // Look through the response for the current tag.
      });
      if (foundTags.length == 0) {
        $scope.tags.push({name: $routeParams.tag}); // If the current tag isn't in the array, add it so the select isn't blank.
      }
    });
    
    seAPIService.search($routeParams.tag, $routeParams.order, $routeParams.sort).success(function (response) {
        $scope.searchQuestions = response.items;
    });
    
    // Set the select for tags to the current path.
    $scope.selectedTag.name = $routeParams.tag;
    
    // Set the select for order to the current query, or default to desc.
    if ($routeParams.order) {
      $scope.selectedOrder = $routeParams.order;
    } else {
      $scope.selectedOrder = 'desc';
    };
    
    // Set the select for sort to the current query to default to activity
    if ($routeParams.sort) {
      $scope.selectedSort = $routeParams.sort;
    } else {
      $scope.selectedSort = 'activity';
    };    
    
    // Change the path to the value of selectTag when changed.
    $scope.selectTag = function(selectedTag) {
      if (selectedTag) {
        $location.path('/search/tag/'+selectedTag.name);
      } else {
        $location.path('/search/tag/');
      }
    };
    
    // Change the params of the query string for optional attributes like sort order.
    // This can use the search method to change just the param, but it doesn't work with path.
    
    $scope.selectOrder = function(selectedOrder) {
      $location.search('order', selectedOrder);
    }
    
    $scope.selectSort = function(selectedSort) {
      $location.search('sort', selectedSort);
    }

  });
