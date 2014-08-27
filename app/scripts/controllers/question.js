'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('QuestionCtrl', function ($scope, $rootScope, $route, $routeParams, $location, seAPIService, seAuthService, breadcrumbs ) {
    
    
    $rootScope.breadcrumbs = breadcrumbs;
    $rootScope.loggedIn = sessionStorage.accessToken;
    
    $scope.isFavorite = []; // Is the current question favorited by the user?
    
    $scope.myFavorites = []; // All of a user's favorites
    $scope.questions = []; // All questions returned by the current id (should be 1)
    $scope.questionComments = []; // All comments associted with the current question's id (should be 0 or more)
    $scope.questionAnswers = []; // All answers associted with the current question's id (should be 0 or more)
    $scope.answerIds = []; // All ids associated with each answer on the page 
    $scope.answerComments = []; // All comments associted with the current answer's id (should be 0 or more)
    
    // Login function
    $rootScope.authenticate = function() {
      seAuthService.authenticate($route);
    }
    
    // Gets question based on question id
    seAPIService.getQuestions($routeParams.questionId, '').success(function (response) {
      $scope.questions = response.items;
      breadcrumbs.options = { 'Question': $scope.questions[0].title }; // Override breadcrumb title with question title.
    });
    
    // Gets question comments based on question id
    seAPIService.getQuestions($routeParams.questionId, 'comments').success(function (response) {
      $scope.questionComments = response.items;
    });
    
    // Gets question answers based on question id
    seAPIService.getQuestions($routeParams.questionId, 'answers').success(function (response) {
      $scope.questionAnswers = response.items;
      
      if ($scope.questionAnswers.length) {
        // Build an array of answer ids to get answer comments.
        for ( var i = 0; i < $scope.questionAnswers.length; i++ ) {
          $scope.answerIds.push($scope.questionAnswers[i].answer_id);
        }
        var answerIdsString = $scope.answerIds.join(";"); // Must be sent with semicolon separators
        
        // Gets answer comments based on answer id
        seAPIService.getAnswers(answerIdsString, 'comments').success(function (response) {
          $scope.answerComments = response.items;
        });
      }
    });
    
    // If a user is logged in, get their favorites and see if the current question id is one. 
    if ($rootScope.loggedIn) {
      seAPIService.getMe('favorites').success(function (response) {
        $scope.myFavorites = response.items;
        
        // Is this question in the user's favorites?
        for ( var i = 0; i < $scope.myFavorites.length; i++ ) {
          if ( $scope.myFavorites[i].question_id == $routeParams.questionId ) {
            $scope.isFavorite = true; // Binds to checkbox to set checked if it's one of the favorites
          }
        }
      });
    };
    
    // Allow a user to set or unset a question as a favorite.
    $scope.favorite = function() {
      seAPIService.setFavorite($routeParams.questionId, $scope.isFavorite)
        .success(function (response) { 
        })
        .error(function (response) {
          if (response.error_id == 407) { //Favorites can be cached for up to 1 minute. If the user refreshes and tries to favorite again, it will return this error, but the UI should still display it as favorited.
          };
        });
    }

  
  });