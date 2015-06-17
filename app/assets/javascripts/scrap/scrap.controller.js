;(function () {
  angular
    .module('app.scrap')
    .controller('ScrapController', Controller);

  Controller.$inject = ['cheatsheets'];

  function Controller (cheatsheets) {
    var vm = this;

    vm.cheatsheets = cheatsheets;
    vm.newCheatsheet = { title: '' };

    vm.cheatsheet = cheatsheets[0];
    vm.newItem = { name: '', description: '' };

    vm.name = 'asdf';
    vm.body = 'qwer';
  }
})();
