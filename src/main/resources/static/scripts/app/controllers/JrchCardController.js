/**  
 * Просомтр журнала регистрации изменений
 */
SP.controller('JrchCardCtrl', function () {
	var me = this;
	me.operations = [{
			date: '28.03.1976',
			action: 'Редактирование',
			user: 'Иванов И. И.',
			fields: [{
					name: 'Наименования организации и ее переименования: Полное наименование и переименования',
					oldValue: 'Главное геодезическое управление',
					newValue: 'Главное геолого-гидро-геодезическое управление'
				}, {
					name: 'Место хранения',
					oldValue: 'Организация',
					newValue: 'Архив'
				}, {
					name: 'Состав документов: Даты',
					oldValue: '1921-1925',
					newValue: '1921-1924'
				}, {
					name: 'Сведения о награждениях: Название награды',
					oldValue: '<<Пусто>>',
					newValue: 'Медаль'
				}]
		}, {
			date: '18.08.1999',
			action: 'Редактирование',
			user: 'Иванов И. И.',
			fields: [{
					name: 'Наименования организации и ее переименования: Краткое наименование',
					oldValue: 'ГГУ',
					newValue: 'ГУГСК'
				}, {
					name: 'Архив',
					oldValue: 'РГАНТД',
					newValue: 'РГАЭ'
				}, {
					name: 'Состав документов: Количество дел',
					oldValue: '1',
					newValue: '12'
				}, {
					name: 'Сведения о загранкомандировках: № описи',
					oldValue: '12',
					newValue: '55'
				}]
		}];
	me.title = 'Посмотреть историю изменений';
	me.record = {
		numberOfElements: 1,
		size: 1,
		current: 1,
		first: true,
		last: true,
		number: 0,
		totalPages: 1
	};
	me.loadRecord = function () {};
});


