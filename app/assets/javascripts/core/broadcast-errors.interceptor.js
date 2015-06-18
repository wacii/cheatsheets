;(function () {
  angular
    .module('app.core')
    .factory('broadcastErrors', interceptor);

  interceptor.$inject = ['$q', '$rootScope'];

  function interceptor ($q, $rootScope) {
    return {
      responseError: function broadcastErrors (rejection) {
        if (rejection.status === 403) {
          $rootScope.$emit('unauthorized');
        } else if (rejection.status >= 500) {
          $rootScope.$emit('serverError', rejection.status);
        }
        $q.reject(rejection);
      }
    };
  }
})();
