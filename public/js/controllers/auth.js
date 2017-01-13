/**
 * Created by rdantzer on 21/06/16.
 */

(function () {

    'use strict';

    angular.module('AuthCtrl', ['ngMaterial', 'ui.router', 'restangular', 'ngCookies'])
        .controller('AuthController', function ($scope, $state, AuthService, AUTH_EVENTS, $rootScope, Restangular, $cookies) {
            $scope.credentials = {
                email: '',
                password: ''
            };
            
            $scope.$on(AUTH_EVENTS.loginSuccess, function (event, session) {
                Restangular.setDefaultHeaders({
                    'token': session.token
                });
                $cookies.put('token', session.token);
                $state.go('index');
                console.log('Session token: "' + session.token + '"');
                // $cookies.putObject('', token);
            });

            $scope.login = function (credentials) {
                AuthService.login(credentials).then(function (user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            };

        });
})();