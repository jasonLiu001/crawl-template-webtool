package com.isoftstone.crawl.template.model;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class PageModel {
	private BasicInfoViewModel basicInfoViewModel;	
	private List<CustomerAttrModel> newsCustomerAttrViewModel;
	private CommonAttrViewModel newsTitleViewModel;	
	private CommonAttrViewModel newsPublishTimeViewModel;	
	private CommonAttrViewModel newsSourceViewModel;	
	private CommonAttrViewModel newsContentViewModel;
	
	private List<CustomerAttrModel> listCustomerAttrViewModel;
	private CommonAttrViewModel listOutLinkViewModel;	
	private ListPaginationViewModel listPaginationViewModel;
    private ScheduleDispatchViewModel scheduleDispatchViewModel;
    private TemplateIncreaseViewModel templateIncreaseViewModel;
    private List<TemplateTagModel> templateTagsViewModel;
	
	public BasicInfoViewModel getBasicInfoViewModel() {
		return basicInfoViewModel;
	}
	public void setBasicInfoViewModel(BasicInfoViewModel basicInfoViewModel) {
		this.basicInfoViewModel = basicInfoViewModel;
	}
	
	
	public List<CustomerAttrModel> getNewsCustomerAttrViewModel() {
		return newsCustomerAttrViewModel;
	}
	public void setNewsCustomerAttrViewModel(
			List<CustomerAttrModel> newsCustomerAttrViewModel) {
		this.newsCustomerAttrViewModel = newsCustomerAttrViewModel;
	}
	
	
	public CommonAttrViewModel getNewsTitleViewModel() {
		return newsTitleViewModel;
	}
	public void setNewsTitleViewModel(CommonAttrViewModel newsTitleViewModel) {
		this.newsTitleViewModel = newsTitleViewModel;
	}
	
	
	public CommonAttrViewModel getNewsPublishTimeViewModel() {
		return newsPublishTimeViewModel;
	}
	public void setNewsPublishTimeViewModel(CommonAttrViewModel newsPublishTimeViewModel) {
		this.newsPublishTimeViewModel = newsPublishTimeViewModel;
	}
	
	
	public CommonAttrViewModel getNewsSourceViewModel() {
		return newsSourceViewModel;
	}
	public void setNewsSourceViewModel(CommonAttrViewModel newsSourceViewModel) {
		this.newsSourceViewModel = newsSourceViewModel;
	}
	
	
	public CommonAttrViewModel getNewsContentViewModel() {
		return newsContentViewModel;
	}
	public void setNewsContentViewModel(CommonAttrViewModel newsContentViewModel) {
		this.newsContentViewModel = newsContentViewModel;
	}
	
	
	public List<CustomerAttrModel> getListCustomerAttrViewModel() {
		return listCustomerAttrViewModel;
	}
	public void setListCustomerAttrViewModel(
			List<CustomerAttrModel> listCustomerAttrViewModel) {
		this.listCustomerAttrViewModel = listCustomerAttrViewModel;
	}
	
	
	public CommonAttrViewModel getListOutLinkViewModel() {
		return listOutLinkViewModel;
	}
	public void setListOutLinkViewModel(CommonAttrViewModel listOutLinkViewModel) {
		this.listOutLinkViewModel = listOutLinkViewModel;
	}
	
	
	public ListPaginationViewModel getListPaginationViewModel() {
		return listPaginationViewModel;
	}
	public void setListPaginationViewModel(ListPaginationViewModel listPaginationViewModel) {
		this.listPaginationViewModel = listPaginationViewModel;
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
	
	public List<TemplateTagModel> getTemplateTagsViewModel() {
		return templateTagsViewModel;
	}
	public void setTemplateTagsViewModel(List<TemplateTagModel> templateTagsViewModel) {
		this.templateTagsViewModel = templateTagsViewModel;
	}
	
	public String toJSON() {
		String json = null;
		ObjectMapper objectmapper = new ObjectMapper();
		try {
			json = objectmapper.writeValueAsString(this);
		} catch (JsonGenerationException e) {			
			e.printStackTrace();
		} catch (JsonMappingException e) {			
			e.printStackTrace();
		} catch (IOException e) {			
			e.printStackTrace();
		}

		return json;		
	}
}
