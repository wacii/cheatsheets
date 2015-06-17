angular
  .module('app.scrap')
  .controller('ScrapController', Controller);

Controller.$inject = [];

function Controller () {
  var vm = this;

  vm.name = 'asdf';
  vm.body = 'qwer';
}
