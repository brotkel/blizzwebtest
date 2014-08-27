'use strict';

/**
 * @ngdoc overview
 * @name blizzwebtestApp
 * @description
 * # blizzwebtestApp
 *
 * Main module of the application.
 */
angular
  .module('blizzwebtestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'blizzwebtestApp.services',
    'angularMoment',
    'ng-breadcrumbs'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        label: 'Home'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        label: 'About'
      })
      .when('/search/tag/:tag', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        label: 'Search'
      })
      .when('/question/:questionId', {
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl',
        label: 'Question'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  // Filters tags in the tag cloud to only unique items.
  .filter('uniqueTags', function() {
    return function(list) {
        var tags = {};
        angular.forEach(list, function(obj, key) {
            angular.forEach(obj.tags, function(value) {
                tags[value] = 1;
            })
        });
        var uniqueTags = []
        for (var key in tags) {
            uniqueTags.push(key);
        }
        return uniqueTags;
    }
  })
  // This directive returns adds "loading" to the scope and allows isLoading to show items on the page when loading (Ajax spinner)
  .directive('loading', ['$http' ,function ($http) {
    return {
      restrict: 'A',
      link: function (scope, elm, attrs) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function (v) {
          if(v) {
            scope.loading = true;
            elm.show();
          } else {
            scope.loading = false;
            elm.hide();
          }
        });
      }
    };
  }]);
  
  // Initializes the Stack Exchange App library. Values provided at http://stackapps.com/apps/oauth/view/3464
  $(function(){
    // Initialize library
    SE.init({ 
      clientId: 3464, 
      key: 'x20eFwhSY2)G0cWDpQdYdg((', 
      // Used for cross domain communication, it will be validated
      channelUrl: 'http://brotkel.github.io/blizzwebtest/blank.html',
      // Called when all initialization is finished
      complete: function(data) { 
          //$('#login-button')
          //  .removeAttr('disabled')
          //  .text('Login'); 
      }
    });
  })