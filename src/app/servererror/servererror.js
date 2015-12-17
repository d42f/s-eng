angular.module('ngApp.states.servererror', [])

.config(function config ($stateProvider) {
  $stateProvider.state('servererror', {
    url: '/servererror/:m',
    views: {
      'layout@': {
        controller: 'ServerErrorCtrl',
        templateUrl: 'servererror/servererror.tpl.html'
      }
    },
    data: {
      pageTitle: 'Server error'
    }
  });
})

.controller('ServerErrorCtrl', function ServerErrorCtrl ($scope, $stateParams) {
  $scope.message = $stateParams.m;
})

;