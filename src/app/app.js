angular.module( 'ngApp', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ui.bootstrap',
  'ngTagsInput',
  'underscore',
  /* states */
  'ngApp.states.home',
  'ngApp.states.learners',
  'ngApp.states.teachers',
  //
  'ngApp.states.servererror'
])

.config( function appConfig ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.headers.common = {'Content-Type': 'application/json;charset=utf-8'};

  $httpProvider.interceptors.push(function () {
    return {
     'request': function(config) {
         if (angular.isObject(config.data)) {
           for (var key in config.data) {
             if (config.data.hasOwnProperty(key) && config.data[key] instanceof Date) {
               config.data[key] = config.data[key].toISOString();
               config.data[key] = String(config.data[key]).split('T')[0];
             }
           }
         }
         return config;
      }
    };
  });

  $locationProvider.html5Mode({
    enabled: false, // true
    requireBase: false
  });

  $urlRouterProvider.otherwise('home');

  $stateProvider.state('skyeng', {
    abstract: true,
    resolve: {
      Levels: function ($rootScope, $state, $http) {
        if ($rootScope.Levels) {
          return $rootScope.Levels;
        }
        return $http.get('/api/levels/').then(function (rsp) {
          if (!angular.isArray(rsp.data)) {
            return $state.go('servererror', {m: 'INVALID_LEVELS_RESPONSE'});
          }
          return $rootScope.Levels = rsp.data;
        }, function () {
          return $state.go('servererror', {m: 'INVALID_LEVELS_RESPONSE'});
        });
      }
    }
  });
})

.run( function appRun ($rootScope, $http, $locale) {
  angular.extend($rootScope, {
    loadTagsByName: function (apipath, name) {
      return $http.get(apipath + '?name=' + name);
    }
  });
})

.controller('AppCtrl', function AppCtrl ($scope, $rootScope, $window) {
  $scope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle;
    }
  });
})

;

