merge into core_subsystem values(1, 'Управление доступом', 'ACCESS_CONTROL'),
							(2, 'Справочники и классификаторы', 'DESCRIPTORS'); 
merge into descriptor_group values(1, 1, 'Тип пользователя', 'USER_TYPE', 1, 1, 0, 0, 0); 
merge into descriptor_value values(1, 1, 'Сотрудник архива', null, 'EMPLOYEE', 2, null), 
							(2, 1, 'Технический пользователь', null, 'TECH_USER', 1, null);
merge into adm_user values(1, 1, 'user', upper(md5('user')), 0, 'Простой пользователь'), 
							(2, 2, 'userb', upper(md5('userb')), 1, 'Заблокированный пользователь'),
							(3, 2, 'admin', upper(md5('admin')), 0, 'Администратор');

merge into strg_organization(organization_id, insert_date, last_update_date) values(1, 
					parsedatetime('2012-09-17 18:47:52', 'yyyy-MM-dd HH:mm:ss'), parsedatetime('2012-09-17 18:47:52', 'yyyy-MM-dd HH:mm:ss'));