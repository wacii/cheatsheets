;(function () {
  angular
    .module('app.core')
    .factory('forceLogin', interceptor);

  interceptor.$inject = ['$q', '$location'];

  function interceptor ($q, $location) {
    return {
      responseError: function forceLogin (rejection) {
        if (rejection.status === 401)
          $location.path('/users/sign_in');
        $q.reject(rejection);
      }
    };
  }
})();
