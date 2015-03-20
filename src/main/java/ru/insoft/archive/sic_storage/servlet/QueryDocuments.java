package ru.insoft.archive.sic_storage.servlet;

import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import ru.insoft.archive.sic_storage.ejb.JsonTools;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 16.07.13
 * Time: 13:40
 * To change this template use File | Settings | File Templates.
 */
public class QueryDocuments extends AbstractServlet
{
    @Inject
    StorageHandler strg;

	@Inject 
	JsonTools jsonTools;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception
    {
        String storageId = req.getParameter("storageId");
        JsonArray arr;
        if (storageId == null)
            arr = Json.createArrayBuilder().build();
        else
        {
            String mode = req.getParameter("mode");
            List<? extends JsonOut> results = null;
            if ("EDIT".equals(mode))
                results = strg.getDocumentsForEdit(Long.valueOf(storageId));
            if ("VIEW".equals(mode))
                results = strg.getDocumentsForView(Long.valueOf(storageId));
            arr = getJsonEntitiesList(results);
        }
        resp.getWriter().write(arr.toString());
    }

	@Override
	protected JsonTools getJsonTools() {
		return jsonTools;
	}
}
