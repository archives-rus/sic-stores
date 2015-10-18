SP.controller('MainCtrl',
		function (criteria, tableResult, Search) {
			var me = this;
			me.crit = criteria;
			me.result = tableResult;
			me.search = Search.loadTablePage;
		});