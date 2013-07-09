package ru.insoft.archive.sic_storage.servlet;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;
import ru.insoft.archive.sic_storage.webmodel.FundSearchCriteria;

import javax.inject.Inject;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 08.07.13
 * Time: 17:02
 * To change this template use File | Settings | File Templates.
 */
public class QueryFundInfo extends AbstractServlet
{
    @Inject
    StorageHandler strg;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception
    {
       String archiveId = req.getParameter("archiveId");
       FundSearchCriteria criteria = (FundSearchCriteria)parseEntity(req.getParameter("fund"), FundSearchCriteria.class);
       JsonObject obj = getJsonForEntity(strg.searchFund(Long.valueOf(archiveId), criteria));
       resp.getWriter().write(obj.toString());
    }
}
