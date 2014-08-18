'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:SearchCtrl
 * @description
 * # AboutCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('SearchCtrl', function ($scope, seAPIService, $routeParams) {

    $scope.searchQuestions = [];
    
    seAPIService.search($routeParams.tag).success(function (response) {
        $scope.searchQuestions = response.items;
    });


  });
