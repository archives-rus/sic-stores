/** 
 * Контроллер для загрузки файла-заявки пользователя
 */
USP.controller('LoadEPGUCtrl', function() {
	var me = this;
	/**
	 * Предоставляет диалог выбора файла
	 */
	me.openFile = function () {
		document.getElementById('epguData').click();
	};
	/**
	 * Проверяет допустимый ли файл открыли
	 */
	me.wrongFile = function() {
		return !(me.file && /\.(xml)$/.test(me.file.name));
	};
});


