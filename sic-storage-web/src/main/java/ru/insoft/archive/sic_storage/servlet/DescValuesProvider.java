package ru.insoft.archive.sic_storage.servlet;

import javax.inject.Inject;
import javax.json.JsonStructure;

import ru.insoft.archive.sic_storage.ejb.StorageHandler;

public class DescValuesProvider extends ru.insoft.archive.extcommons.servlet.DescValuesProvider 
{
	@Inject
	StorageHandler strg;
	
	@Override
	protected JsonStructure processCustomAction(String action) throws Exception
	{
		if (action.equals("getArchives"))
			return getJsonEntitiesList(strg.getArchives());
		
		return null;	
	}
}
