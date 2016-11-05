(() => {
  'use strict';
  
  const app = angular.module('myApp.procedural');
  
  app.service('localStorageOperations', ['config', (config) => {
    const service = {
      getData: getData,
      saveData: saveData
    };
    return service;
    
    function getData (item) {
      return JSON.parse(localStorage.getItem(item));
    }
    
    function saveData (item, data) {
      return localStorage.setItem(item, JSON.stringify(data));
    }
  }])
  
})();
