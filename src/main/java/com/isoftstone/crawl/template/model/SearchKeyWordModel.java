package com.isoftstone.crawl.template.model;

import java.util.List;

/**
 * 
 * 搜索引擎关键字实体类
 * */
public class SearchKeyWordModel {
	private String status;
	private String errorCode;
	private String errorMsg;
	private String total;
	private List<SearchKeyWordDataModel> data;
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public List<SearchKeyWordDataModel> getData() {
		return data;
	}
	public void setData(List<SearchKeyWordDataModel> data) {
		this.data = data;
	}
}
