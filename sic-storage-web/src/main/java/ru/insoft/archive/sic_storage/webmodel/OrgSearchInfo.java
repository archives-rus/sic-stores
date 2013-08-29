package ru.insoft.archive.sic_storage.webmodel;

import java.util.List;

import ru.insoft.archive.extcommons.json.JsonOut;

public class OrgSearchInfo implements JsonOut 
{
	private Integer results;
	private List<OrgSearchResult> values;
	
	public Integer getResults() {
		return results;
	}
	
	public void setResults(Integer results) {
		this.results = results;
	}
	
	public List<OrgSearchResult> getValues() {
		return values;
	}
	
	public void setValues(List<OrgSearchResult> values) {
		this.values = values;
	}
}
