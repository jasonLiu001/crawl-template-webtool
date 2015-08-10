package com.isoftstone.crawl.template.model;

/**
 * 
 * 爬取数据实体
 * */
public class CrawlDataModel {
	private String templateId = "";
	private String name = "";
	private String description = "";
	private String url = "";
	private Long indexCounts;
	private Long todayIndexCounts;
	
	private Long todayPublishTimeCounts;
	
	private String checkTime = "";
	private String dataSource = "";

	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
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

	public Long getIndexCounts() {
		return indexCounts;
	}

	public void setIndexCounts(Long indexCounts) {
		this.indexCounts = indexCounts;
	}

	public Long getTodayIndexCounts() {
		return todayIndexCounts;
	}

	public void setTodayIndexCounts(Long todayIndexCounts) {
		this.todayIndexCounts = todayIndexCounts;
	}

	public String getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}	
	
	public Long getTodayPublishTimeCounts() {
		return todayPublishTimeCounts;
	}

	public void setTodayPublishTimeCounts(Long todayPublishTimeCounts) {
		this.todayPublishTimeCounts = todayPublishTimeCounts;
	}
}
