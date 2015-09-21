package ru.insoft.archive.sic_storage;

import org.hibernate.dialect.Oracle10gDialect;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.StandardBasicTypes;

/**
 * Created with IntelliJ IDEA. User: melnikov Date: 15.07.13 Time: 15:58 To
 * change this template use File | Settings | File Templates.
 */
public class SicStorageDialect extends Oracle10gDialect {

	public SicStorageDialect() {
		super();
		registerFunction("get_org_storage_years",
			new StandardSQLFunction("STORAGE_PACK.GET_ORG_STORAGE_YEARS", StandardBasicTypes.STRING));
	}
}
