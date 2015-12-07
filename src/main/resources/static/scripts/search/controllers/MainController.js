SSP.controller('MainCtrl', function () {
	var me = this;
	var data = [{
			names: ['Организация 1', 'Наименование 1', 'Наименование 2'],
			places: [{
					fond: '1-20-А',
					dates: '1945-1950',
					level: 'Федеральный архив',
					archive: 'ГАРФ',
					adres: 'ул. Прямокова, д. 7',
					phone: '174-41-41',
					email: 'it@mail.ru'
				}, {
					fond: '2-42-Б',
					dates: '1903-1910',
					level: 'Федеральный архив',
					archive: 'РГАНТД',
					adres: 'ул. Иванова Ивана',
					phone: '134-41-42'
				}, {
					fond: '1-24-А',
					dates: '1944-1975',
					level: 'Федеральный архив',
					archive: 'РГАСПИ',
					adres: 'ул. Цветкова, д. 18',
					phone: '004-23-41',
					email: 'it@rambler.ru'
				}, {
					fond: '1-431-А',
					dates: '1941-1954',
					level: 'Архив',
					archive: 'РГАСПИ',
					adres: 'ул. Кондаршева, д. 18',
					phone: '234-141-14',
					email: 'it@jou.ru'
				}
			]
		}, {
			names:['Организация 2', 'Наименование 1', 'Наименовани 2'],
			places: [{
					fond: '2-42-Б',
					dates: '1903-1910',
					level: 'Федеральный архив',
					archive: 'РГАНТД',
					adres: 'ул. Иванова Ивана',
					phone: '134-41-42'
				}, {
					fond: '1-24-А',
					dates: '1944-1975',
					level: 'Федеральный архив',
					archive: 'РГАСПИ',
					adres: 'ул. Цветкова, д. 18',
					phone: '004-23-41',
					email: 'it@rambler.ru'
				}, {
					fond: '1-431-А',
					dates: '1941-1954',
					level: 'Архив',
					archive: 'РГАСПИ',
					adres: 'ул. Кондаршева, д. 18',
					phone: '234-141-14',
					email: 'it@jou.ru'
				}
			]
		}];
	me.search = function () {
		me.organizations = data;
	};
});

