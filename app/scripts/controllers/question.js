'use strict';

/**
 * @ngdoc function
 * @name blizzwebtestApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the blizzwebtestApp
 */
angular.module('blizzwebtestApp')
  .controller('QuestionCtrl', function ($scope, $rootScope, seAPIService, $routeParams, $location) {
  
    $rootScope.loggedIn = sessionStorage.accessToken;
    
    $scope.questions = [];
    $scope.questionComments = [];
    $scope.questionAnswers = [];
    $scope.answerIds = []
    $scope.answerComments = [];
    
    seAPIService.getQuestions($routeParams.questionId, '').success(function (response) {
      $scope.questions = response.items;
    });
    
    seAPIService.getQuestions($routeParams.questionId, 'comments').success(function (response) {
      $scope.questionComments = response.items;
    });
    
    seAPIService.getQuestions($routeParams.questionId, 'answers').success(function (response) {
      $scope.questionAnswers = response.items;
      
      // Build an array of answer ids to get answer comments.
      for (var i = 0; i < $scope.questionAnswers.length; i++ ) {
        $scope.answerIds.push($scope.questionAnswers[i].answer_id);
      }
      var answerIdsString = $scope.answerIds.join(";"); // Must be sent with semicolon separators
      
      seAPIService.getAnswers(answerIdsString, 'comments').success(function (response) {
        $scope.answerComments = response.items;
      });
      
    });
    
    
  
  });