package servlet;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class
        QueryDocuments extends HttpServlet {

	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.handleRequest(req, resp);
	}
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.handleRequest(req, resp);
	}
	
	private void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException,IOException{
		String mode = req.getParameter("mode");
		if (mode==null || "".equals(mode)){
			throw new ServletException("Некорректный запрос");
		}
		if ("VIEW".equals(mode)){
			String row = "[{'documentType':'Document type one','dates':'date 1 - date 2','series':'series one'}]";
			resp.getWriter().write(row);
		}
		if ("EDIT".equals(mode)){
			String row = "[";
			row+="{'id':1,'documentTypeId':2,'dates':'date 1 - date 2', 'series':'01 series edit'},";
			row+="{'id':2,'documentTypeId':3,'dates':'date 3 - date 4', 'series':'02 series'},";
			row+="{'id':3,'documentTypeId':4,'dates':'date 4 - date 5', 'series':'03 series'}";
			row+="]";
			
			resp.getWriter().write(row);
		}
	}
	
}
