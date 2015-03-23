package ru.insoft.archive.sic_storage.servlet;

import javax.ejb.EJBException;
import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.sic_storage.ejb.StorageHandler;
import ru.insoft.archive.sic_storage.model.table.StrgOrganization;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolationException;
import ru.insoft.archive.sic_storage.ejb.JsonTools;

/**
 * Created with IntelliJ IDEA. User: melnikov Date: 10.07.13 Time: 13:03 To
 * change this template use File | Settings | File Templates.
 */
public class SaveOrganization extends AbstractServlet {

	@Inject
	StorageHandler strg;

	@Inject
	JsonTools jsonTools;

	@Override
	protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		StrgOrganization org = (StrgOrganization) parseEntity(req.getParameter("org"), StrgOrganization.class);
		try {
			org = strg.modifyOrganization("SAVE", org.getId(), org);
		} catch (EJBException ex) {
			if (ex.getMessage().contains("SIC.STRG_FUND_UK")) {
				resp.setStatus(500);
				resp.getWriter().write("Фонд с таким номером уже существует.");
				return;
			}
			throw ex;
		}

		JsonObjectBuilder bldr = Json.createObjectBuilder();
		bldr.add("success", true);
		bldr.add("id", org.getId());
		resp.getWriter().write(bldr.build().toString());
	}

	@Override
	protected JsonTools getJsonTools() {
		return jsonTools;
	}
}
