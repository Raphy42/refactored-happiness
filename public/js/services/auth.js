/**
 * Created by rdantzer on 22/06/16.
 */

(function () {

    'use strict';

    angular
        .module('fspork')
        .factory('AuthService', function ($http, $rootScope, Session, AUTH_EVENTS, API_EVENTS) {

            var authService = {};

            authService.login = function (credentials) {
                return $http
                    .post('/api/authenticate', credentials)
                    .then(function (res) {
                        Session.create(res.data.payload.token, res.data.payload._id);
                        return Session.get();
                    });
            };

            //TODO implement authService.register
            authService.register = function (registration) {
                return $http
                    .post('/api/register', registration)
                    .then(function (res) {
                        return res;
                    }, function (err) {
                        return err;
                    })
            };

            authService.loginFromCookie = function (token, _id) {
               Session.create(token, _id);
            };

            authService.getUser = function () {
                return Session;
            };

            authService.logout = function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                return true;
            };

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
            };

            return authService;
        });

})();