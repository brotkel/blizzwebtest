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
    
    // Displayed information
    $scope.tags = []; // Tag cloud of tags present in the displayed questions.
    $scope.searchQuestions = []; // All the questions based on selected filters.
    
    // Form for filtering data
    $scope.selectedTag = []; // The currently selected tag
    $scope.selectedOrder = []; // The currently selected sort order
    $scope.selectedSort = []; // The currently selected sorting criteria
    $scope.orders = [
      {name: 'Ascending', value: 'asc'},
      {name: 'Descending', value: 'desc'}
    ];
    $scope.sorts = [
      {name: 'Activity', value: 'activity'},
      {name: 'Votes', value: 'votes'},
      {name: 'Creation Date', value: 'creation'},
      {name: 'Relevance', value: 'relevance'}
    ];
    
    // Login function
    $rootScope.authenticate = function() {
      seAuthService.authenticate($route);
    }
    
    // Gets popular tags to populate the tag select
    seAPIService.getTags().success(function (response) {
      $scope.tags = response.items;

      var foundTags = $.grep($scope.tags, function(e) {
        return e.name == $routeParams.tag; // Look through the response for the current tag.
      });
      if (foundTags.length == 0) {
        $scope.tags.push({name: $routeParams.tag}); // If the current tag isn't in the array, add it so the select isn't blank.
      }
    });
    
    // The main request to search for questions based on filters.
    seAPIService.search($routeParams.tag, $routeParams.order, $routeParams.sort).success(function (response) {
        $scope.searchQuestions = response.items;
    });
    
    // Set the select for tags to the current path.
    $scope.selectedTag.name = $routeParams.tag;
    
    // Set the select for order to the current query, or default to desc.
    if ($routeParams.order) {
      $scope.selectedOrder.value = $routeParams.order;
    } else {
      $scope.selectedOrder.value = 'desc';
    };
    
    // Set the select for sort to the current query to default to activity
    if ($routeParams.sort) {
      $scope.selectedSort.value = $routeParams.sort;
    } else {
      $scope.selectedSort.value = 'activity';
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
      $location.search('order', selectedOrder.value);
    }
    
    $scope.selectSort = function(selectedSort) {
      $location.search('sort', selectedSort.value);
    }

  });
