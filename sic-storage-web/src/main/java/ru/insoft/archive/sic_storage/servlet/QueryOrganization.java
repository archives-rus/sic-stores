package ru.insoft.archive.sic_storage.servlet;

import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;

import javax.inject.Inject;
import javax.json.JsonObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 15.07.13
 * Time: 19:36
 * To change this template use File | Settings | File Templates.
 */
public class QueryOrganization extends AbstractServlet
{
    @Inject
    StorageHandler strg;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception
    {
        Long id = Long.valueOf(req.getParameter(idParamKey));
        String mode = req.getParameter("mode");
        JsonOut entity = null;

        if ("EDIT".equals(mode))
            entity = strg.prepareOrg(id);

        resp.getWriter().write(getJsonForEntity(entity).toString());
    }
}
