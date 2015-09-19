merge into adm_user values(1, 81, 'user', upper(md5('user')), 0, 'Простой пользователь'), 
							(2, 81, 'userb', upper(md5('userb')), 1, 'Заблокированный пользователь'),
							(3, 81, 'admin', upper(md5('admin')), 0, 'Администратор');
