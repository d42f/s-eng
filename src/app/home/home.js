angular.module('ngApp.states.home', [
  //
])

.config(function config ($stateProvider) {
  $stateProvider.state('home', {
    parent: 'skyeng',
    url: '/home',
    views: {
      'layout@': {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data: {
      pageTitle: 'Home'
    },
    resolve: {
      Teachers: function ($http) {
        var dateTo = new Date();
        dateTo.setMonth(dateTo.getMonth() + 1);
        dateTo.setDate(0);
        var dateFrom = new Date(dateTo.getTime());
        dateFrom.setDate(1);
        return $http.get('/api/teachers/', {
          params: {
            learner_birthdate_from: String(dateFrom.toISOString()).split('T')[0],
            learner_birthdate_to: String(dateTo.toISOString()).split('T')[0]
          }
        }).then(function (rsp) {
          return rsp.data;
        }, function () {
          return [];
        });
      }
    }
  });
})

.controller('HomeCtrl', function HomeCtrl ($scope, Teachers) {
  angular.extend($scope, {
    teachers: Teachers
  });
})

;

