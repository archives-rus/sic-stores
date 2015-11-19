USP.controller("LoadInitDataCtrl", function (fileUpload, $timeout) {
	var me = this;
	/**
	 * Загружает файл на сервер
	 */
	me.upload = function () {
		fileUpload.uploadFileToUrl(
				{file: me.file, clear: me.clear ? true : false},
				"/utils/load-data")
				.success(function () {
					me.success = true;
					showStatus('success');
				})
				.error(function (data) {
					me.error = data;
					showStatus('error');
				});
	};
	/**
	 * Предоставляет диалог выбора файла
	 */
	me.openFile = function () {
		document.getElementById('inputData').click();
	};
	/**
	 * Проверяет допустимый ли файл открыли
	 */
	me.wrongFile = function() {
		return !(me.file && /\.(mdb|accdb)$/.test(me.file.name));
	};
	/**
	 * Отображает статус выполненной операции некоторое время 
	 * @param {String} status - статус для отбражения
	 */
	function showStatus(status) {
		$timeout(function () {
			me[status] = undefined;
		}, 3000);
	}
});