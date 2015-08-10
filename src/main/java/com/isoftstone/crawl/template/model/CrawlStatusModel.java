package com.isoftstone.crawl.template.model;

public class CrawlStatusModel {
	private String templateId = "";
	private String name = "";
	private String description = "";
	private String url = "";
	private String crawlStatus = "";
	private String checkTime="";
	
	public String getTemplateId() {
		return templateId;
	}
	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getCrawlStatus() {
		return crawlStatus;
	}
	public void setCrawlStatus(String crawlStatus) {
		this.crawlStatus = crawlStatus;
	}
	public String getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}
}
