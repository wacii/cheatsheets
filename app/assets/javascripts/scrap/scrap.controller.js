angular
  .module('app.scrap')
  .controller('ScrapController', Controller);

Controller.$inject = ['cheatsheets'];

function Controller (cheatsheets) {
  var vm = this;

  vm.cheatsheets = cheatsheets;

  vm.name = 'asdf';
  vm.body = 'qwer';
}
