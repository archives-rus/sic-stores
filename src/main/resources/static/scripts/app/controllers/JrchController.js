SP.controller('JrchCtrl', function (criteriaJ, tableResultJ, Search) {
	var me = this;
	// Критерии поиска
	me.crit = criteriaJ;
	// результаты поиска
	me.result = tableResultJ;
	me.loadPage = Search.loadTablePageJ;

	// открытие datepickers
	me.dp = {
		start: false,
		end: false
	};
	me.openDP = function (picker) {
		me.dp[picker] = true;
	};
	me.dateOptions = {
		startingDay: 1,
		currentText: "Сегодня",
		clearText: "Очистить",
		closeText: "Выбрать",
		showWeeks: false
	};
});

