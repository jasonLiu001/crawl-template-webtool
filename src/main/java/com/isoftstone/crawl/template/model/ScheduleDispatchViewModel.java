package com.isoftstone.crawl.template.model;

/**
 * 
 * 调度任务的View-Model
 * */
public class ScheduleDispatchViewModel {
	private String domain="";
	private String period = "";
	private String sequence="";
	private boolean useProxy;
	
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	
	public String getSequence() {
		return sequence;
	}
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
	public boolean getUseProxy() {
		return useProxy;
	}
	public void setUseProxy(boolean useProxy) {
		this.useProxy = useProxy;
	}
}
