package com.isoftstone.crawl.template.model;

import java.util.List;

/**
 * 
 * 模板列表实体
 * */
public class TemplateModel {	
   private String templateId="";   
   private String status="";
   private String description="";
   private BasicInfoViewModel basicInfoViewModel;
   private ScheduleDispatchViewModel scheduleDispatchViewModel;
   private TemplateIncreaseViewModel templateIncreaseViewModel;
   private List<String> templateIncreaseIdList;
   private String addedTime="";
   
public String getTemplateId() {
	return templateId;
}
public void setTemplateId(String templateId) {
	this.templateId = templateId;
}

public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}

public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}

public String getAddedTime() {
	return addedTime;
}
public void setAddedTime(String addedTime) {
	this.addedTime = addedTime;
}

public ScheduleDispatchViewModel getScheduleDispatchViewModel() {
	return scheduleDispatchViewModel;
}
public void setScheduleDispatchViewModel(ScheduleDispatchViewModel scheduleDispatchViewModel) {
	this.scheduleDispatchViewModel = scheduleDispatchViewModel;
}

public TemplateIncreaseViewModel getTemplateIncreaseViewModel() {
	return templateIncreaseViewModel;
}
public void setTemplateIncreaseViewModel(TemplateIncreaseViewModel templateIncreaseViewModel) {
	this.templateIncreaseViewModel = templateIncreaseViewModel;
}
public List<String> getTemplateIncreaseIdList() {
	return templateIncreaseIdList;
}
public void setTemplateIncreaseIdList(List<String> templateIncreaseIdList) {
	this.templateIncreaseIdList = templateIncreaseIdList;
}
public BasicInfoViewModel getBasicInfoViewModel() {
	return basicInfoViewModel;
}
public void setBasicInfoViewModel(BasicInfoViewModel basicInfoViewModel) {
	this.basicInfoViewModel = basicInfoViewModel;
}
}
