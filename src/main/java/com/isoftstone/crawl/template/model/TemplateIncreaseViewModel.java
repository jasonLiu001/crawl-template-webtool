package com.isoftstone.crawl.template.model;

/**
 * 
 * 增量配置
 * */
public class TemplateIncreaseViewModel {
	private String period = "";
	private String pageCounts="";
	private String pageSort="";
	
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	
	public String getPageCounts() {
		return pageCounts;
	}
	public void setPageCounts(String pageCounts) {
		this.pageCounts = pageCounts;
	}
	public String getPageSort() {
		return pageSort;
	}
	public void setPageSort(String pageSort) {
		this.pageSort = pageSort;
	}
}
