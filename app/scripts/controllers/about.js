'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('AboutCtrl', function ($scope, $rootScope, $route, seAPIService, seAuthService, breadcrumbs) {
    
    $rootScope.breadcrumbs = breadcrumbs;
    $rootScope.loggedIn = sessionStorage.accessToken;

    $rootScope.authenticate = function() {
      seAuthService.authenticate($route);
    }
  });
