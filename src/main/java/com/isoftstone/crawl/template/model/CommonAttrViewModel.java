package com.isoftstone.crawl.template.model;

/**
 * 
 * 共用Model
 * */
public class CommonAttrViewModel {
	private String selector = "";
	private String selectorAttr = "";
	private String otherSelector = "";
	private String filterCategory = "";
	private String filter = "";
	private String filterReplaceTo = "";
	private String formatter = "";
	private String formatCategory = "";

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

	public String getFilterReplaceTo() {
		return filterReplaceTo;
	}

	public void setFilterReplaceTo(String filterReplaceTo) {
		this.filterReplaceTo = filterReplaceTo;
	}

	public String getFormatter() {
		return formatter;
	}

	public void setFormatter(String formatter) {
		this.formatter = formatter;
	}

	public String getFormatCategory() {
		return formatCategory;
	}

	public void setFormatCategory(String formatCategory) {
		this.formatCategory = formatCategory;
	}

	public String getOtherSelector() {
		return otherSelector;
	}

	public void setOtherSelector(String otherSelector) {
		this.otherSelector = otherSelector;
	}

}
