package ru.insoft.archive.sic_storage.servlet;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.extcommons.webmodel.FailMessage;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.sic_storage.ejb.JsonTools;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 16.07.13
 * Time: 15:56
 * To change this template use File | Settings | File Templates.
 */
public class DeleteOrganization extends AbstractServlet
{
    @Inject
    StorageHandler strg;

	@Inject 
	JsonTools jsonTools;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception
    {
        Long id = Long.valueOf(req.getParameter(idParamKey));
        strg.modifyOrganization("DELETE", id, null);

        resp.getWriter().write(getJsonForEntity(new FailMessage(true, "ok")).toString());
    }

	@Override
	protected JsonTools getJsonTools() {
		return jsonTools;
	}
}
