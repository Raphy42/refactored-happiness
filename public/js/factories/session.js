/**
 * Created by rdantzer on 22/06/16.
 */

(function () {
    'use strict';

    angular.module('fspork').service('Session', function () {
        this.create = function (token, _id) {
            this.token = token;
            this._id = _id;
        };

        this.destroy = function () {
            this.token = null;
            this._id = null;
        };

        this.get = function () {
            return this;
        };

        this.getId = function () {
            return this._id;
        }
    });

})();