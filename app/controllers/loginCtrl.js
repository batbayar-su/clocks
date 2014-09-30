/**
 * Created by colinjlacy on 9/19/14.
 */
angular.module("clocks")
	.controller("loginCtrl", function($scope, $q, $rootScope, $http, dbSrvc, userSrvc) {

		// set some basic data
		$scope.loginUsername = "admin@admin.com";
		$scope.loginPassword = "password";

		// the function that makes the login attempt using a username and password
		$scope.attemptLogin = function() {

			// make the ajax call to the user table via the userSrvc
			userSrvc.login($scope.loginUsername, $scope.loginPassword).then(function(login) {

				// if there were no backend errors whatsoever
				if (!login.error) {
					console.log(login.id);
					// get the projects for this user from the database

					dbSrvc.loadProjects(login.id).then(function(data) {
						console.log(data);
						// set them on the rootScope
						$rootScope.projects = data;
						//$rootScope.$apply();

					});

				}

			});

		};

		$scope.register = {};

		$scope.register.firstName = 'Ashley';
		$scope.register.lastName = 'Lacy';
		$scope.register.userName = 'ashleyjlacy';
		$scope.register.password = 'a';
		$scope.register.passConf = 'a';
		$scope.register.email = 'ashley@webcake.co';
		$scope.register.emailConf = 'ashley@webcake.co';



			$scope.registerUser = function() {
			userSrvc.register(
				$scope.register.firstName,
				$scope.register.lastName,
				$scope.register.userName,
				$scope.register.password,
				$scope.register.passConf,
				$scope.register.email,
				$scope.register.emailConf,
				//$scope.register.ip
				'141.164.238.158'
			)
		}

	});