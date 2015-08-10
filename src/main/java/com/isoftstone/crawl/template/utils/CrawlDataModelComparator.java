package com.isoftstone.crawl.template.utils;

import java.util.Comparator;

import com.isoftstone.crawl.template.model.CrawlDataModel;

public class CrawlDataModelComparator implements Comparator<CrawlDataModel> {
	public int compare(CrawlDataModel t1, CrawlDataModel t2) {
		return t1.getName().compareTo(t2.getName());
	}
}
