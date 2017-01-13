/*
* @Author: rdantzer
* @Date:   2016-06-18 08:29:28
* @Last Modified by:   rdantzer
* @Last Modified time: 2016-06-18 08:36:19
*/

module.exports.schemes = {
	login: {
		'email': {
			notEmpty: true,
			isEmail: {
				errorMessage: 'Invalid email'
			}
		},
		'password': {
			notEmpty: true,
			errorMessage: 'Invalid password'
		}
	}
}