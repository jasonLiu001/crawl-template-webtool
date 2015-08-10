package com.isoftstone.crawl.template.utils;

import java.util.Comparator;

import com.isoftstone.crawl.template.model.TemplateModel;

/**
 * 
 * 自定义排序类
 * */
public class TemplateModelComparator implements Comparator<TemplateModel> {
	public int compare(TemplateModel t1, TemplateModel t2) {
		return t1.getBasicInfoViewModel().getName().compareTo(t2.getBasicInfoViewModel().getName());
	}
}
