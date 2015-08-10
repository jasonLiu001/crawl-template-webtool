package com.isoftstone.crawl.template.model;

/**
 * 
 * 种子有效性Model
 * */
public class SeedsEffectiveStatusModel {
	private String templateId = "";
	private String name = "";
	private String description = "";
	private String url = "";
	private String effectiveStatus = "";
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

	public String getEffectiveStatus() {
		return effectiveStatus;
	}

	public void setEffectiveStatus(String effectiveStatus) {
		this.effectiveStatus = effectiveStatus;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}
}
