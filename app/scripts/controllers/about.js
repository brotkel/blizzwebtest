'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
