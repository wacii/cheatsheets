;(function () {
  angular
    .module('app.core')
    .controller('CoreController', Controller);

  Controller.$inject = ['$rootScope'];

  function Controller ($rootScope) {
    var vm = this;

    vm.message = '';

    $rootScope.$on('unauthorized',
      function (event) {
        vm.message = "Nope. You're not authorized to see that.";
      }
    );

    $rootScope.$on('serverError',
      function (event, status) {
        vm.message = 'Server error ' + status + '. Try again in a bit.';
      }
    );

    $rootScope.$on('$routeChangeError',
      function (event, current, previous, rejection) {
        vm.message = "You're stuck here for now. Try again in a bit.";
      }
    );
  }
})();
