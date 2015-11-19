/**
 * Сервис для загрузки файла на сервер
 */
USP.service('fileUpload', function ($http) {
	this.uploadFileToUrl = function (params, uploadUrl) {
		var fd = new FormData();
		for (var o in params)
			fd.append(o, params[o]);

		return $http.post(uploadUrl, fd, {
//			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		});
	};
});