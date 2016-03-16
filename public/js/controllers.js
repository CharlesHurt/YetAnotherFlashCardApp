'use strict';

var flashcardApp = angular.module('flashcardApp', ['ui.router']);

flashcardApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('homeState', {
  	url: '/',
  	template: '<h3>home</h3>'
  })
  .state('listState', {
  	url:'/listState',
  	templateUrl:"htmlPartials/listView.html"
  })
  $urlRouterProvider.otherwise('/')
})


flashcardApp.controller('flashcardController', function($scope) {
  $scope.test = 42;
  $scope.getFlashcards = function() {
  	return flashcardService.getFlashcards()
  }

});

flashcardApp.service('flashcardService', function($http) {
  this.getFlashcards = function() {
  	$http({
  	  method: "GET",
  	  url: "/flashcards"
  	}).then(function(res) {
  		return res.data
  	}, function(err) {
        return err
  	})
  }

	
});