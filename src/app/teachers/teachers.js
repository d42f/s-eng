angular.module('ngApp.states.teachers', [
  //
])

.config(function config ($stateProvider) {
  $stateProvider.state('teachers', {
    parent: 'skyeng',
    url: '/teachers',
    views: {
      'layout@': {
        controller: 'TeachersCtrl',
        templateUrl: 'teachers/teachers.tpl.html'
      }
    },
    data: {
      pageTitle: 'Teachers'
    },
    resolve: {
      Teachers: function ($http) {
        return $http.get('/api/teachers/').then(function (rsp) {
          return rsp.data;
        }, function () {
          return [];
        });
      }
    }
  });
})

.controller('TeachersCtrl', function TeachersCtrl ($scope, $http, $uibModal, Teachers) {
  angular.extend($scope, {
    newTeacher: {},
    teachers: Teachers
  });

  $scope.addNew = function () {
    $http.post('/api/teachers/', angular.copy($scope.newTeacher)).then(function (rsp) {
      $scope.newTeacher = {};
      $scope.teachers.push(rsp.data);
    });
  };

  $scope.removeOld = function (o) {
    if (!confirm('Remove?')) {
      return undefined;
    }
    if (o && o.id) {
      $http({method: 'DELETE', url: '/api/teachers/', params: {id: o.id}}).then(function (rsp) {
        for (var i = $scope.teachers.length; i-- > 0;) {
          if ($scope.teachers[i].id == o.id) {
            $scope.teachers.splice(i, 1);
          }
        }
      });
    }
  };

  $scope.showRelations = function (o) {
    $uibModal.open({
      templateUrl: 'teachers/teachers.modal.tpl.html',
      controller: 'TeachersModalCtrl',
      size: 'modal-sm',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        Item: function () {
          return o;
        },
        Relations: function () {
          return $http.get('/api/learners/?teacher_id=' + o.id).then(function (rsp) {
            return rsp.data;
          }, function () {
            return [];
          });
        }
      }
    }).result.then(function (o) {
      $http.put('/api/teachers/?id=' + o.id, {relations: o.relations});
    });
  };
})

.controller('TeachersModalCtrl', function TeachersModalCtrl ($scope, $uibModalInstance, _, Item, Relations) {
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

