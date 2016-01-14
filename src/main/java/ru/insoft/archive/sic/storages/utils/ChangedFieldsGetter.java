package ru.insoft.archive.sic.storages.utils;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.insoft.archive.sic.storages.domain.ChangedField;

/**
 * Формирует список значений измененных полей сущностей.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class ChangedFieldsGetter {

	private final Map<Class<?>, String[][]> gettersNames = new HashMap<>();

	public void addFieldsNames(Class<?> type, String[][] names) {
		gettersNames.put(type, names);
	}

	public <T> List<ChangedField> getChangedFields(T newOne, T oldOne) {
		return getChangedFields(newOne, oldOne, null);
	}

	public <T, U extends JpaRepository> List<ChangedField> getChangedFields(T newOne, T oldOne, U repo) {
		List<ChangedField> fields = new ArrayList<>();
		boolean newNull = newOne == null;
		boolean oldNull = oldOne == null;
		Class<?> type;
		if (!newNull) {
			type = newOne.getClass();
		} else {
			type = oldOne.getClass();
		}
		String[][] names = gettersNames.get(type);
		for (String[] fn : names) {
			String label = fn[0];
			String methodName = fn[1];
			boolean isForeignKey = fn.length == 3;
			try {
				Object newValue = null;
				Object oldValue = null;
				Method method = type.getMethod(methodName);
				if (newNull) {
					oldValue = getValueOfField(method, oldOne, repo, isForeignKey);
				} else if (oldNull) {
					newValue = getValueOfField(method, newOne, repo, isForeignKey);
				} else {
					oldValue = getValueOfField(method, oldOne, repo, isForeignKey);
					newValue = getValueOfField(method, newOne, repo, isForeignKey);
				}
				if (!Objects.equals(newValue, oldValue)) {
					fields.add(new ChangedField(label, newValue == null ? "" : newValue.toString(),
							oldValue == null ? "" : oldValue.toString()));
				}
			} catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException ex) {
				Logger.getLogger(type.getName()).log(Level.SEVERE, null, ex);
			}
		}
		return fields;
	}

	private <T, U extends JpaRepository> Object getValueOfField(Method method, T obj,
			U repo, boolean isForeignKey) throws InvocationTargetException, IllegalAccessException {
		Object value = method.invoke(obj);
		if (repo == null || !isForeignKey) {
			return value;
		}
		return repo.getOne((Serializable) value);
	}
}
