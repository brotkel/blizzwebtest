angular.module('blizzwebtestApp.services', []).
  factory('seAPIService', function($http) {

    var seAPI = {};
    
    seAPI.getMe = function(userSegment) {
      return $http({
        url: 'https://api.stackexchange.com/2.2/me/'+ userSegment +'?key=x20eFwhSY2)G0cWDpQdYdg((&site=stackoverflow&access_token='+sessionStorage.accessToken
      });
    }

    seAPI.getTags = function() {
      return $http({
        url: 'https://api.stackexchange.com/2.2/tags?key=x20eFwhSY2)G0cWDpQdYdg((&order=desc&sort=popular&site=stackoverflow'
      });
    }
    
    seAPI.search = function(tag) {
      return $http({
        url: 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged='+ tag +'&site=stackoverflow'
      });
    }    

    return seAPI;
  });