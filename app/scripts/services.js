angular.module('blizzwebtestApp.services', []).
  factory('seAPIService', function($http) {

    var seAPI = {};
    var key = "x20eFwhSY2)G0cWDpQdYdg((";
    
    seAPI.getMe = function(userSegment) {
      return $http({
        url: 'https://api.stackexchange.com/2.2/me/'+ userSegment +'?key='+ key +'&site=stackoverflow&access_token='+ sessionStorage.accessToken
      });
    }

    seAPI.getTags = function() {
      return $http({
        url: 'https://api.stackexchange.com/2.2/tags?key='+ key +'&order=desc&sort=popular&site=stackoverflow'
      });
    }
    
    seAPI.search = function(tag, order, sort) {
      order = typeof order !== 'undefined' ? order : "desc";
      sort = typeof sort !== 'undefined' ? sort : "activity";
      return $http({
        url: 'https://api.stackexchange.com/2.2/search?key='+ key +'&order='+ order +'&sort='+ sort +'&tagged='+ tag +'&site=stackoverflow'
      });
    } 
    
    seAPI.getQuestions = function(questionId, questionSegment) {
      if (questionSegment == 'comments') { // Pass different parameters for comments.
        return $http({
          url: 'https://api.stackexchange.com/2.2/questions/'+ questionId +'/'+ questionSegment +'?key='+ key +'&order=desc&sort=creation&site=stackoverflow&filter=withbody'
        });
      } else {
        return $http({
          url: 'https://api.stackexchange.com/2.2/questions/'+ questionId +'/'+ questionSegment +'?key='+ key +'&order=desc&sort=votes&site=stackoverflow&filter=withbody'
        });
      }
    }
    
    seAPI.getAnswers =  function(answerId, answerSegment) {
      return $http({
        url: 'https://api.stackexchange.com/2.2/answers/'+ answerId +'/'+ answerSegment +'?key='+ key +'&order=desc&sort=creation&site=stackoverflow&filter=withbody'
      });
    }
    
    seAPI.setFavorite = function(questionId, favorite) {
      if (favorite == true) {
        return $http({
          method: 'POST',
          url: 'https://api.stackexchange.com/2.2/questions/'+ questionId +'/favorite',
          data: 'site=stackoverflow&key='+ key +'&access_token='+ sessionStorage.accessToken,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
      } else {
        return $http({
          method: 'POST',
          url: 'https://api.stackexchange.com/2.2/questions/'+ questionId +'/favorite/undo',
          data: 'site=stackoverflow&key='+ key +'&access_token='+ sessionStorage.accessToken,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
      }
    }

    return seAPI;
  });