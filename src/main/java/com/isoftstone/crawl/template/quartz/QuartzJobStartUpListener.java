/*
 * @(#)QuartzJobStartUpListener.java 2015-3-26 上午11:14:19 crawl-template-webtool
 * Copyright 2015 Isoftstone, Inc. All rights reserved. ISOFTSTONE
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.isoftstone.crawl.template.quartz;

import java.util.Date;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

/**
 * QuartzJobStartUpListener
 *
 * @author danhb
 * @version 1.0
 * @date 2015-3-26
 */
public class QuartzJobStartUpListener implements ServletContextListener {

    private static final Log LOG = LogFactory
            .getLog(QuartzJobStartUpListener.class);

    private static final Integer INTERVAL_IN_HOUR = 12;

    /*
     * (non-Javadoc)
     * 
     * @see javax.servlet.ServletContextListener#contextDestroyed(javax.servlet.
     * ServletContextEvent)
     */
    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        // TODO Auto-generated method stub

    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * javax.servlet.ServletContextListener#contextInitialized(javax.servlet
     * .ServletContextEvent)
     */
    @Override
    public void contextInitialized(ServletContextEvent context) {
        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {
                startUpQuartzJob();
            }
        });
        thread.start();
    }

    private void startUpQuartzJob() {
        SchedulerFactory sf = new StdSchedulerFactory();
        Scheduler sched;
        try {
            //--调度判断种子有效性任务，作为webtool的中间缓存.
            String job_name_checkSeedStatus = "检查种子有效性";
            JobDetail check_seedStatus = JobBuilder
                    .newJob(CheckSeedsStatusJob.class)
                    .withIdentity(job_name_checkSeedStatus, "TCGroup").build();
            Trigger checkSeedStatusTrigger = TriggerBuilder
                    .newTrigger()
                    .withIdentity(job_name_checkSeedStatus, "TCGroup")
                    .withSchedule(SimpleScheduleBuilder.simpleSchedule().repeatForever().withIntervalInHours(INTERVAL_IN_HOUR))
                    .startAt(new Date()).build();
            sched = sf.getScheduler();
            sched.scheduleJob(check_seedStatus, checkSeedStatusTrigger);
            sched.start();
        } catch (SchedulerException e) {
            LOG.error("判断种子有效性任务异常.", e);
        }
    }

}
