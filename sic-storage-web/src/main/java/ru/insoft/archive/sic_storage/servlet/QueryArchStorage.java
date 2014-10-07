package ru.insoft.archive.sic_storage.servlet;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;

import javax.inject.Inject;
import javax.json.JsonArray;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created with IntelliJ IDEA. User: melnikov Date: 08.07.13 Time: 18:50 To
 * change this template use File | Settings | File Templates.
 */
public class QueryArchStorage extends AbstractServlet {

	@Inject
	StorageHandler strg;

	@Override
	protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		Long archiveId = Long.valueOf(req.getParameter("archiveId"));
		JsonArray arr = getJsonEntitiesList(strg.queryArchStorage(archiveId));
		resp.getWriter().write(arr.toString());
	}
}
