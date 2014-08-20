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
    'angularMoment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/search/tag/:tag', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/question/:questionId', {
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('StackExchangeService', [
    // Stack Exchange API
    $(function(){
      // Initialize library
      SE.init({ 
        clientId: 3464, 
        key: 'x20eFwhSY2)G0cWDpQdYdg((', 
        // Used for cross domain communication, it will be validated
        channelUrl: 'http://localhost/blank.html',
        // Called when all initialization is finished
        complete: function(data) { 
            $('#login-button')
              .removeAttr('disabled')
              .text('Login'); 
        }
      });
    
      // Attach click handler to login button
      $('#login-button').click(function() {
    
        // Make the authentication call, note that being in an onclick handler
        //   is important; most browsers will hide windows opened without a
        //   'click blessing'
        SE.authenticate({
          success: function(data) { 
            //alert(
            //  'User Authorized with account id = ' + 
            //  data.networkUsers[0].account_id + ', got access token = ' + 
            //  data.accessToken
            //);
            sessionStorage.accessToken = data.accessToken; // TODO: We're using HTML5 session storage to store the access token for now. This would probably be better done through Angular's cookieStore service.
          },
          error: function(data) { 
            alert('An error occurred:\n' + data.errorName + '\n' + data.errorMessage); 
          },
          networkUsers: true
        });
      });
    })
  ])
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