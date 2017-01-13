/**
 * Created by rdantzer on 18/06/16.
 */

(function () {
    'use strict';

    var app = angular.module('fspork', ['ui.router', 'ngMdIcons', 'restangular', 'ngAnimate',
        'ProjectCtrl', 'NavbarCtrl', 'NotifCtrl', 'AuthCtrl']);

    app.constant('AUTH_EVENTS', {
        profileSuccess: 'profile-success',
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    app.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        default: 'default',
        guest: 'guest'
    });

    app.constant('API_EVENTS', {
        badRequest: 'content-bad-request',
        endOfWaiting: 'content-no-more-waiting',
        waiting: 'content-waiting',
        contentAdded: 'content-added',
        contentSaved: 'content-edited',
        contentCreated: 'content-created',
        contentRemoved: 'content-removed',
        contentModified: 'content-modified'
    });

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('project');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/partials/login.html'
            })
            .state('index', {
                url: '/index',
                templateUrl: '/partials/index.html'
            })
            .state('project', {
                url: '/projects',
                templateUrl: '/partials/project.html'
            })
            .state('project.detail', {
                url: '/projects/:projectId',
                templateUrl: '/partials/project.detail.html'
            })
    });

    app.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('indigo');
    });


    /**
     * Restangular config
     */
    app.config(function (RestangularProvider) {
        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var extractedData;

            if (operation === "getList") {
                extractedData = data.payload;
                //TODO Pagination ?
            } else {
                console.log(data);
                extractedData = data.payload;
            }

            return extractedData;
        });
    });

    /**
     * Authentication middleware
     */
    app.run(function (Restangular, $state, $rootScope, AUTH_EVENTS, API_EVENTS) {
        Restangular.setBaseUrl('/api/');
        Restangular.setErrorInterceptor(
            function (response) {
                $rootScope.$broadcast(API_EVENTS.endOfWaiting);
                if (response.status === 401) {
                    console.log('Login required!');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    $state.go('login');
                } else if (response.status === 403) {
                    console.log('It\'s forbidden to go in here :(');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else if (response.status === 404) {
                    console.log('Resource unavailable');
                } else if (response.status === 400) {
                    console.log('Bad request');
                    $rootScope.$broadcast(API_EVENTS.badRequest, response.data.payload.message);
                }
                return false;
            }
        );
    });
})();