package com.isoftstone.crawl.template.utils;

import java.util.Comparator;

import com.isoftstone.crawl.template.model.CrawlStatusModel;

public class CrawlStatusModelComparator implements Comparator<CrawlStatusModel> {
	public int compare(CrawlStatusModel t1, CrawlStatusModel t2) {
		return t1.getName().compareTo(t2.getName());
	}
}
