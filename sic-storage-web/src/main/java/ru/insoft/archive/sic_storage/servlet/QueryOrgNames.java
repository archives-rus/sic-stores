package ru.insoft.archive.sic_storage.servlet;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;

import javax.inject.Inject;
import javax.json.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 16.07.13
 * Time: 13:04
 * To change this template use File | Settings | File Templates.
 */
public class QueryOrgNames extends AbstractServlet
{
    @Inject
    StorageHandler strg;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception
    {
        String id = req.getParameter(idParamKey);
        JsonArray arr;
        if (id == null)
            arr = Json.createArrayBuilder().build();
        else
            arr = getJsonEntitiesList(strg.getOrgNames(Long.valueOf(id)));
        resp.getWriter().write(arr.toString());
    }
}
