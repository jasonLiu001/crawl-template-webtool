package com.isoftstone.crawl.template.utils;

import com.isoftstone.crawl.template.model.CrawlDataModelList;
import com.isoftstone.crawl.template.model.CrawlStatusModelList;
import com.isoftstone.crawl.template.model.SeedsEffectiveStatusList;

/**
 * 
 * 爬取运行状态监控缓存类
 * */
public class StatusMonitorCache {
	// 种子有效性
	private static SeedsEffectiveStatusList seedsEffectiveStatusListCache = new SeedsEffectiveStatusList();
	// 爬取状态
	private static CrawlStatusModelList crawlStatusModelListCache = new CrawlStatusModelList();
	// 爬取数据
	private static CrawlDataModelList crawlDataModelListCache = new CrawlDataModelList();

	public static SeedsEffectiveStatusList getSeedsEffectiveStatusListCache() {
		return seedsEffectiveStatusListCache;
	}

	public static void setSeedsEffectiveStatusListCache(SeedsEffectiveStatusList seedsEffectiveStatusListCache) {
		StatusMonitorCache.seedsEffectiveStatusListCache = seedsEffectiveStatusListCache;
	}

	public static CrawlStatusModelList getCrawlStatusModelListCache() {
		return crawlStatusModelListCache;
	}

	public static void setCrawlStatusModelListCache(CrawlStatusModelList crawlStatusModelListCache) {
		StatusMonitorCache.crawlStatusModelListCache = crawlStatusModelListCache;
	}

	public static CrawlDataModelList getCrawlDataModelListCache() {
		return crawlDataModelListCache;
	}

	public static void setCrawlDataModelListCache(CrawlDataModelList crawlDataModelListCache) {
		StatusMonitorCache.crawlDataModelListCache = crawlDataModelListCache;
	}
}
