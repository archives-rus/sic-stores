package ru.insoft.archive.sic_storage.servlet;

import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;
import ru.insoft.archive.sic_storage.webmodel.OrgSearchCriteria;
import ru.insoft.archive.sic_storage.webmodel.OrgSearchResult;

import javax.inject.Inject;
import javax.persistence.Tuple;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: melnikov
 * Date: 12.07.13
 * Time: 19:50
 * To change this template use File | Settings | File Templates.
 */
public class SearchOrganization extends AbstractServlet
{
    @Inject
    StorageHandler strg;

    @Override
    protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception
    {
        OrgSearchCriteria criteria = (OrgSearchCriteria)parseEntity(req.getParameter(criteriaParamKey), OrgSearchCriteria.class);
        Integer start = Integer.valueOf(req.getParameter(startParamKey));
        Integer limit = Integer.valueOf(req.getParameter(limitParamKey));

        List<OrgSearchResult> orgList = strg.searchOrganization(criteria, start, limit);
        resp.getWriter().write(getJsonEntitiesList(orgList).toString());
    }
}
