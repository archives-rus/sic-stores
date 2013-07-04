package servlet;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DescValuesProvider extends HttpServlet {
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
		String action = req.getParameter("action");
		String dict = req.getParameter("dict");
		
		if ("getDictValues".equals(action)){
			if ("DOCUMENT_TYPE".equals(dict)){
				String row = "[";
				row+="{'id':1,'name':'doc type one'},";
				row+="{'id':2,'name':'doc type two'},";
				row+="{'id':3,'name':'doc type three'}";
				row+="]";
				resp.getWriter().write(row);
			}
			
		}
	}
}
