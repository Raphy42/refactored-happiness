/**
 * Created by rdantzer on 22/06/16.
 */

(function () {

    'use strict';

    angular
        .module('NotifCtrl', ['ngMaterial'])
        .controller('NotificationController', function ($scope, $mdToast, AUTH_EVENTS, API_EVENTS) {

            $scope.toastPosition = 'up right';
            $scope.active = false;

            $scope.$on(AUTH_EVENTS.loginSuccess, function (event) {
                $scope.showNotificationToast('Login successful');
            });

            $scope.$on(AUTH_EVENTS.logoutSuccess, function (event) {
                $scope.showNotificationToast('Logout successful');
            });

            $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
                $scope.showNotificationToast('Please login first');
            });

            $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
                $scope.showNotificationToast('You are not allowed to this');
            });

            $scope.$on(API_EVENTS.contentAdded, function (event) {
                $scope.showNotificationToast('Added');
            });

            $scope.$on(API_EVENTS.contentCreated, function (event) {
                $scope.showNotificationToast('Created');
            });

            $scope.$on(API_EVENTS.contentModified, function (event) {
                $scope.showNotificationToast('Modified');
            });

            $scope.$on(API_EVENTS.contentSaved, function (event) {
                $scope.showNotificationToast('Saved');
            });

            $scope.$on(API_EVENTS.waiting, function (event) {
             //TODO implement $scope.showLoadingBar(true);
            });

            $scope.$on(API_EVENTS.endOfWaiting, function (event) {
                //TODO implement $scope.showLoadingBar(false);
            });

            $scope.$on(API_EVENTS.badRequest, function (event, args) {
                $scope.showNotificationToast(args);
            });

            $scope.showLoadingBar = function (status) {
                $scope.active = status;
            };

            $scope.showNotificationToast = function (message) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position($scope.toastPosition)
                );
            }
        });
})();