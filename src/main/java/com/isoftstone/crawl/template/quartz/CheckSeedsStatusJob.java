package com.isoftstone.crawl.template.quartz;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

import com.isoftstone.crawl.template.webtool.CrawlToolService;

public class CheckSeedsStatusJob implements Job {

    @Override
    public void execute(JobExecutionContext context) {
        CrawlToolService crawlToolService = new CrawlToolService();
        crawlToolService.getSeedsEffectiveStatusList();
    }
}
