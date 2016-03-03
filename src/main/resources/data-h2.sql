merge into core_subsystem values(1, 'Управление доступом', 'ACCESS_CONTROL'),
							(2, 'Справочники и классификаторы', 'DESCRIPTORS'); 
merge into descriptor_group values(1, 1, 'Тип пользователя', 'USER_TYPE', 1, 1, 0, 0, 0), 
							(2, 1, 'Организационная структура', 'ORG_STRUCTURE', 1, 1, 0, 0, 0); 
merge into descriptor_value values(1, 1, 'Сотрудник архива', null, 'EMPLOYEE', 2, null), 
							(2, 1, 'Технический пользователь', null, 'TECH_USER', 1, null),
							(3, 2, 'Архив', null, null, 1, null);
merge into adm_user values(1, 1, 'user', upper(md5('user')), 0, 'Простой пользователь'), 
							(2, 2, 'userb', upper(md5('userb')), 1, 'Заблокированный пользователь'),
							(3, 2, 'admin', upper(md5('admin')), 0, 'Администратор');
merge into strg_organization(organization_id, archive_id, add_user_id, mod_user_id, insert_date, last_update_date) 
					values(1, 3, 3, 1, {ts '2012-09-17 18:47:52'}, {ts '2012-09-17 18:47:52'});