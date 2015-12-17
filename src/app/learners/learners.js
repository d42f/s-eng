angular.module('ngApp.states.learners', [
  //
])

.config(function config ($stateProvider) {
  $stateProvider.state('learners', {
    parent: 'skyeng',
    url: '/learners',
    views: {
      'layout@': {
        controller: 'LearnersCtrl',
        templateUrl: 'learners/learners.tpl.html'
      }
    },
    data: {
      pageTitle: 'Learners'
    },
    resolve: {
      Learners: function ($http) {
        return $http.get('/api/learners/').then(function (rsp) {
          return rsp.data;
        }, function () {
          return [];
        });
      }
    }
  });
})

.controller('LearnersCtrl', function LearnersCtrl ($scope, $http, $uibModal, Learners) {
  angular.extend($scope, {
    newLearner: {},
    learners: Learners
  });

  $scope.addNew = function () {
    $http.post('/api/learners/', angular.copy($scope.newLearner)).then(function (rsp) {
      $scope.newLearner = {};
      $scope.learners.push(rsp.data);
    });
  };

  $scope.removeOld = function (o) {
    if (!confirm('Remove?')) {
      return undefined;
    }
    if (o && o.id) {
      $http({method: 'DELETE', url: '/api/learners/', params: {id: o.id}}).then(function (rsp) {
        for (var i = $scope.learners.length; i-- > 0;) {
          if ($scope.learners[i].id == o.id) {
            $scope.learners.splice(i, 1);
          }
        }
      });
    }
  };

  $scope.showRelations = function (o) {
    $uibModal.open({
      templateUrl: 'learners/learners.modal.tpl.html',
      controller: 'LearnersModalCtrl',
      size: 'modal-sm',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        Item: function () {
          return o;
        },
        Relations: function () {
          return $http.get('/api/teachers/?learner_id=' + o.id).then(function (rsp) {
            return rsp.data;
          }, function () {
            return [];
          });
        }
      }
    }).result.then(function (o) {
      $http.put('/api/learners/?id=' + o.id, {relations: o.relations});
    });
  };
})

.controller('LearnersModalCtrl', function LearnersModalCtrl ($scope, $uibModalInstance, _, Item, Relations) {
  angular.extend($scope, {
    item: Item,
    relations: Relations
  });

  $scope.save = function () {
    $scope.item.relations = _.map($scope.relations || [], function (o) {
      return o.id;
    });
    $uibModalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

;

