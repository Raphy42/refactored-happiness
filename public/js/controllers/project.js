/**
 * Created by rdantzer on 18/06/16.
 */

(function () {
    'use strict';

    angular.module('ProjectCtrl', ['ngMaterial', 'ui.router', 'restangular', 'chart.js'])
        .controller('ProjectController', function ($state, $scope, $rootScope, API_EVENTS, Restangular, Session) {
            $scope.projects = [];
            $scope.project = [];

            Restangular.one('users', Session.getId()).all('projects').getList().then(function (projects) {
                $scope.projects = projects;
            });

            if ($state.is('project.detail'))
                Restangular.one('projects', $state.params.projectId).get().then(function (project) {
                    $scope.project = project;
                });

            $scope.status = function (id) {
                $state.go('project.detail', {"projectId": id});
            };

            $scope.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

            $scope.data = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ];
        });
})();