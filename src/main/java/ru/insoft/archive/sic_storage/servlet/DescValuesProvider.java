package ru.insoft.archive.sic_storage.servlet;

import javax.inject.Inject;
import javax.json.JsonStructure;
import ru.insoft.archive.sic_storage.ejb.CommonDBHandler;
import ru.insoft.archive.sic_storage.ejb.JsonTools;

import ru.insoft.archive.sic_storage.ejb.StorageHandler;

public class DescValuesProvider extends ru.insoft.archive.extcommons.servlet.DescValuesProvider {
	@Inject
	StorageHandler strg;

	@Inject
	JsonTools jsonTools;

	@Inject
	CommonDBHandler dbHandler;
	
	@Override
	protected JsonStructure processCustomAction(String action) throws Exception {
		if (action.equals("getArchives"))
			return getJsonEntitiesList(strg.getArchives());
		
		return null;	
	}

	@Override
	protected CommonDBHandler getDbHandler() {
		return dbHandler;
	}

	@Override
	protected JsonTools getJsonTools() {
		return jsonTools;
	}
}
