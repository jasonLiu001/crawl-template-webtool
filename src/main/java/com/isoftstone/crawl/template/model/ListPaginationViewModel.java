package com.isoftstone.crawl.template.model;

/**
 * 
 * 分页属性model
 * */
public class ListPaginationViewModel {
	private String selector = "";
	private String selectorAttr = "";
	private String otherSelector = "";
	private String filterCategory = "";
	private String filter = "";
	private String paginationType = "";
	private String paginationUrl = "";
	private String currentString = "";
	private String replaceTo = "";
	private String filterReplaceTo = "";
	private String start = "";
	private String records = "";
	private String lastNumber = "";
	private String interval = "";

	public String getSelector() {
		return selector;
	}

	public void setSelector(String selector) {
		this.selector = selector;
	}

	public String getSelectorAttr() {
		return selectorAttr;
	}

	public void setSelectorAttr(String selectorAttr) {
		this.selectorAttr = selectorAttr;
	}

	public String getFilterCategory() {
		return filterCategory;
	}

	public void setFilterCategory(String filterCategory) {
		this.filterCategory = filterCategory;
	}

	public String getFilter() {
		return filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	public String getPaginationType() {
		return paginationType;
	}

	public void setPaginationType(String paginationType) {
		this.paginationType = paginationType;
	}

	public String getPaginationUrl() {
		return paginationUrl;
	}

	public void setPaginationUrl(String paginationUrl) {
		this.paginationUrl = paginationUrl;
	}

	public String getCurrentString() {
		return currentString;
	}

	public void setCurrentString(String currentString) {
		this.currentString = currentString;
	}

	public String getFilterReplaceTo() {
		return filterReplaceTo;
	}

	public void setFilterReplaceTo(String filterReplaceTo) {
		this.filterReplaceTo = filterReplaceTo;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getRecords() {
		return records;
	}

	public void setRecords(String records) {
		this.records = records;
	}

	public String getInterval() {
		return interval;
	}

	public void setInterval(String interval) {
		this.interval = interval;
	}

	public String getReplaceTo() {
		return replaceTo;
	}

	public void setReplaceTo(String replaceTo) {
		this.replaceTo = replaceTo;
	}

	public String getLastNumber() {
		return lastNumber;
	}

	public void setLastNumber(String lastNumber) {
		this.lastNumber = lastNumber;
	}

	public String getOtherSelector() {
		return otherSelector;
	}

	public void setOtherSelector(String otherSelector) {
		this.otherSelector = otherSelector;
	}
}
