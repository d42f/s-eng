describe('AppCtrl', function () {
  var AppCtrl, $scope;

  beforeEach(module('ngApp'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    AppCtrl = $controller('AppCtrl', {$scope: $scope});
  }));

  it('should pass a dummy test', inject(function () {
    expect(AppCtrl).toBeTruthy();
  }));
}); 