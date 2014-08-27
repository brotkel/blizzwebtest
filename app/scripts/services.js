angular
  .module('blizzwebtestApp.services', [])
  .factory('seAPIService', function($http) {

    var seAPI = {};
    var key = "x20eFwhSY2)G0cWDpQdYdg((";
    
    // Gets the user profile
    seAPI.getMe = function(userSegment) {
      return $http({
        url: 'https://api.stackexchange.com/2.2/me/'+ userSegment +'?key='+ key +'&site=stackoverflow&access_token='+ sessionStorage.accessToken
      });
    }
    
    // Gets top tags on the site
    seAPI.getTags = function() {
      return $http({
        url: 'https://api.stackexchange.com/2.2/tags?key='+ key +'&order=desc&sort=popular&site=stackoverflow'
      });
    }
    
    // Returns question data based on search criteria. Options can be changed based on URL parameters on the search page.
    seAPI.search = function(tag, order, sort) {
      order = typeof order !== 'undefined' ? order : "desc";
      sort = typeof sort !== 'undefined' ? sort : "activity";
      return $http({
        url: 'https://api.stackexchange.com/2.2/search?key='+ key +'&order='+ order +'&sort='+ sort +'&tagged='+ tag +'&site=stackoverflow'
      });
    } 
    
    // Gets question and various question-related data (comments, answers) on the questions page.
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
    
    // Given a shown answer, get the comments associated with that answer.
    seAPI.getAnswers = function(answerId, answerSegment) {
      return $http({
        url: 'https://api.stackexchange.com/2.2/answers/'+ answerId +'/'+ answerSegment +'?key='+ key +'&order=desc&sort=creation&site=stackoverflow&filter=withbody'
      });
    }
    
    // Allows setting or unsetting a favorite for a logged-in user.
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
  })
  // Stack Exchange Login Script
  .service('seAuthService', function() {
  
    var stackExchangeAuth = {};
    
    stackExchangeAuth.authenticate = function(route) {
      SE.authenticate({
        success: function(data) { 
          sessionStorage.accessToken = data.accessToken; // We're using HTML5 session storage to store the access token for now. This would probably be better done through Angular's cookieStore service.
          route.reload(); // Refreshes the current route, getting new data available to logged-in users.
        },
        error: function(data) { 
          alert('An error occurred:\n' + data.errorName + '\n' + data.errorMessage); 
        },
        scope: ['write_access'], // Write access is required to set favorites.
        networkUsers: true
      })
    }
    return stackExchangeAuth;
  });