/*
 * @(#)CrawlStateUtil.java 2015-3-10 下午2:39:09 crawl-template-webtool Copyright
 * 2015 Isoftstone, Inc. All rights reserved. ISOFTSTONE
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.isoftstone.crawl.template.crawlstate;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import redis.clients.jedis.Jedis;

import com.isoftstone.crawl.template.consts.WebtoolConstants;
import com.isoftstone.crawl.template.global.Constants;
import com.isoftstone.crawl.template.impl.ParseResult;
import com.isoftstone.crawl.template.impl.TemplateFactory;
import com.isoftstone.crawl.template.model.CrawlStateBean;
import com.isoftstone.crawl.template.model.PageModel;
import com.isoftstone.crawl.template.utils.Config;
import com.isoftstone.crawl.template.utils.RedisOperator;
import com.isoftstone.crawl.template.utils.RedisUtils;
import com.isoftstone.crawl.template.utils.ShellUtils;
import com.isoftstone.crawl.template.vo.DispatchVo;
import com.isoftstone.crawl.template.vo.RunManager;
import com.isoftstone.crawl.template.vo.Seed;
import com.isoftstone.crawl.template.webtool.CrawlToolResource;

/**
 * CrawlStateUtil
 *
 * @author danhb
 * @version 1.0
 * @date 2015-3-10
 */
public class CrawlState {

    /**
     *
     */
    private static final String ERROR = "error";

    /**
     *
     */
    private static final String SUCCESS = "success";

    private static final Log LOG = LogFactory.getLog(CrawlState.class);

    /**
     * 获取爬虫状态.
     *
     * @return 爬虫状态设置.
     */
    public List<CrawlStateBean> getCrawlState() {
        List<String> folderNameList = getResultList("*(increment)", Constants.DISPATCH_REDIS_DBINDEX);
        List<String> normalFolderNameList = getResultList("*_dispatch", Constants.DISPATCH_REDIS_DBINDEX);
        folderNameList.addAll(normalFolderNameList);
        List<CrawlStateBean> crawlStateList = new ArrayList<CrawlStateBean>();
        List<String> redisKeys = new ArrayList<String>();
        for (Iterator<String> it = folderNameList.iterator(); it.hasNext(); ) {
            String redisKey = it.next();
            redisKeys.add(redisKey);
        }
        List<DispatchVo> dispatchVos = RedisUtils.getDispatchListResult(redisKeys, Constants.DISPATCH_REDIS_DBINDEX);
        for (DispatchVo dispatchVo : dispatchVos) {
            String redisKey = dispatchVo.getRedisKey();
            CrawlStateBean bean = new CrawlStateBean();
            if (redisKey != null) {
                bean.setDispatchName(redisKey.substring(0, redisKey.lastIndexOf("_")));
            } else {
                continue;
            }
            String crawlState = "";
            if ("running".equals(dispatchVo.getStatus())) {
                crawlState = "爬取中";
            } else if ("start".equals(dispatchVo.getStatus())) {
                crawlState = "未开始";
            } else if ("complete".equals(dispatchVo.getStatus())) {
                crawlState = "完成";
            }
            bean.setCrawlState(crawlState);
            crawlStateList.add(bean);
        }
        return crawlStateList;
    }
    
    /**
     * 获取爬虫状态.
     *
     * @return 爬虫状态设置.
     */
    public List<CrawlStateBean> getCrawlState(boolean isNomal) {
        List<String> folderNameList;
        if(isNomal) {
            folderNameList = getResultList("*_dispatch", Constants.DISPATCH_REDIS_DBINDEX);
        }else {
            folderNameList = getResultList("*(increment)", Constants.DISPATCH_REDIS_DBINDEX);
        }
        List<CrawlStateBean> crawlStateList = new ArrayList<CrawlStateBean>();
        List<String> redisKeys = new ArrayList<String>();
        for (Iterator<String> it = folderNameList.iterator(); it.hasNext(); ) {
            String redisKey = it.next();
            redisKeys.add(redisKey);
        }
        List<DispatchVo> dispatchVos = RedisUtils.getDispatchListResult(redisKeys, Constants.DISPATCH_REDIS_DBINDEX);
        for (DispatchVo dispatchVo : dispatchVos) {
            String redisKey = dispatchVo.getRedisKey();
            CrawlStateBean bean = new CrawlStateBean();
            if (redisKey != null) {
                bean.setDispatchName(redisKey.substring(0, redisKey.lastIndexOf("_")));
            } else {
                continue;
            }
            String crawlState = "";
            if ("running".equals(dispatchVo.getStatus())) {
                crawlState = "爬取中";
            } else if ("start".equals(dispatchVo.getStatus())) {
                crawlState = "未开始";
            } else if ("complete".equals(dispatchVo.getStatus())) {
                crawlState = "完成";
            }
            bean.setCrawlState(crawlState);
            crawlStateList.add(bean);
        }
        return crawlStateList;
    }

    /**
     * 重爬.
     *
     * @param folderName 文件夹名称.
     * @param isDeploy   是否是集群.
     * @param isNomal    是否是全量.
     * @return 结果标识.
     */
    public String crawl(String folderName, boolean isDeploy, boolean isNomal) {
        String result = ERROR;
        if (isNomal) {
            result = crawlFull(folderName, isDeploy);
        } else {
            result = crawlIncrement(folderName, isDeploy);
        }
        return result;
    }

    /**
     * 爬虫增量.
     *
     * @param dispatchName
     */
    public String crawlIncrement(String folderName, boolean isDeploy) {
        String rootFolder = Config.getValue(WebtoolConstants.FOLDER_NAME_ROOT);
        String shDir;
        String crawlDir = Config.getValue(WebtoolConstants.KEY_NUTCH_CRAWLDIR);
        String solrURL = Config.getValue(WebtoolConstants.KEY_NUTCH_SOLR_URL);
        String depth = "2";
        String dispatchName = folderName + WebtoolConstants.DISPATCH_REIDIS_POSTFIX_INCREMENT;
        DispatchVo dispatchVo = RedisOperator.getDispatchResult(dispatchName, Constants.DISPATCH_REDIS_DBINDEX);
        boolean userProxy = dispatchVo.isUserProxy();

        //--确定shDir.
        if (isDeploy) {
            shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_DEPLOY_INCREMENT_SHDIR);
            if (userProxy) {
                shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_DEPLOY_INCREMENT_PROXY_SHDIR);
            }
        } else {
            shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_LOCAL_INCREMENT_SHDIR);
            if (userProxy) {
                shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_LOCAL_INCREMENT_PROXY_SHDIR);
            }
        }

        String folderNameSeed = dispatchName.substring(0, dispatchName.lastIndexOf("_"));
        String folderNameData = folderNameSeed.substring(0, folderNameSeed.lastIndexOf("_"));
        String[] folderNameStrs = folderNameSeed.split("_");
        folderNameSeed = folderNameStrs[0] + "_" + folderNameStrs[1] + "_" + WebtoolConstants.INCREMENT_FILENAME_SIGN + "_" + folderNameStrs[2];
        folderNameData = folderNameData.substring(0, folderNameData.lastIndexOf("_")) + "_" + WebtoolConstants.INCREMENT_FILENAME_SIGN;
        String seedFolder = rootFolder + File.separator + folderNameSeed;
        String command = shDir + " " + seedFolder + " " + crawlDir + folderNameData + "_data" + " " + solrURL + " " + depth;
        final RunManager runManager = getRunmanager(command);
        LOG.info("增量重爬:" + command);
        CrawlToolResource.putSeedsFolder(folderNameSeed, "local");

        String resultMsg = "";
        ExecutorService es = Executors.newSingleThreadExecutor();
        Future<String> result = es.submit(new Callable<String>() {
            public String call() throws Exception {
                // the other thread
                return ShellUtils.execCmd(runManager);
            }
        });
        try {
            resultMsg = result.get();
        } catch (Exception e) {
            LOG.info("", e);
            // failed
        }
//        new Thread(new Runnable() {
//
//            @Override
//            public void run() {
//                ShellUtils.execCmd(runManager);
//            }
//        }).start();
        return resultMsg;
    }

    /**
     * 爬虫全量.
     *
     * @param dispatchName
     */
    public String crawlFull(final String folderName, boolean isDeploy) {
        String rootFolder = Config.getValue(WebtoolConstants.FOLDER_NAME_ROOT);
        String shDir;
        String crawlDir = Config.getValue(WebtoolConstants.KEY_NUTCH_CRAWLDIR);
        String solrURL = Config.getValue(WebtoolConstants.KEY_NUTCH_SOLR_URL);
        String depth = "3";
        final String dispatchName = folderName + WebtoolConstants.DISPATCH_REIDIS_POSTFIX_NORMAL;
        final DispatchVo dispatchVo = RedisOperator.getDispatchResult(dispatchName, Constants.DISPATCH_REDIS_DBINDEX);
        boolean userProxy = dispatchVo.isUserProxy();

        if (isDeploy) {
            shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_DEPLOY_NORMAL_SHDIR);
            if (userProxy) {
                shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_DEPLOY_NORMAL_PROXY_SHDIR);
            }
        } else {
            shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_LOCAL_NORMAL_SHDIR);
            if (userProxy) {
                shDir = Config.getValue(WebtoolConstants.KEY_NUTCH_LOCAL_NORMAL_PROXY_SHDIR);
            }
        }

        String folderNameSeed = dispatchName.substring(0, dispatchName.lastIndexOf("_"));
        String folderNameData = folderNameSeed.substring(0, folderNameSeed.lastIndexOf("_"));
        String seedFolder = rootFolder + File.separator + folderNameSeed;
        if (isDeploy) {
            seedFolder = Config.getValue(WebtoolConstants.KEY_HDFS_ROOT_PREFIX) + folderNameSeed;
        }

        List<Seed> seedList = dispatchVo.getSeed();
        final List<String> seedStrs = new ArrayList<String>();
        for (Iterator<Seed> it = seedList.iterator(); it.hasNext(); ) {
            Seed seed = it.next();
            if ("true".equals(seed.getIsEnabled())) {
                seedStrs.add(seed.getUrl());
            }
        }
        contentToTxt4CrawlerAgain(folderName, seedStrs, "true");

        dispatchVo.setStatus(WebtoolConstants.DISPATCH_STATIS_RUNNING);
        RedisOperator.setDispatchResult(dispatchVo, dispatchName, Constants.DISPATCH_REDIS_DBINDEX);

        String command = shDir + " " + seedFolder + " " + crawlDir + folderNameData + "_data" + " " + solrURL + " " + depth;
        LOG.info("全量重爬:" + command);
        CrawlToolResource.putSeedsFolder(folderNameSeed, "local");
        final RunManager runManager = getRunmanager(command);

        String resultMsg = "";
        ExecutorService es = Executors.newSingleThreadExecutor();
        Future<String> result = es.submit(new Callable<String>() {
            public String call() throws Exception {
                // the other thread
                //return  ShellUtils.execCmd(runManager);
                String tpResult = "";
                LOG.info("重爬开始执行:runManager.ip" + runManager.getHostIp());
                LOG.info("重爬开始执行:runManager.command" + runManager.getCommand());
                tpResult = ShellUtils.execCmd(runManager);
                LOG.info("重爬执行完成：runManager.command" + runManager.getCommand());
                contentToTxt4CrawlerAgain(folderName, seedStrs, "false");
                dispatchVo.setStatus(WebtoolConstants.DISPATCH_STATIS_COMPLETE);
                RedisOperator.setDispatchResult(dispatchVo, dispatchName, Constants.DISPATCH_REDIS_DBINDEX);
                return tpResult;
            }
        });
        try {
            resultMsg = result.get();
        } catch (Exception e) {
            // failed
        }

//        new Thread(new Runnable() {
//
//            @Override
//            public void run() {
//                LOG.info("重爬开始执行:runManager.ip" + runManager.getHostIp());
//                LOG.info("重爬开始执行:runManager.command" + runManager.getCommand());
//                ShellUtils.execCmd(runManager);
//                LOG.info("重爬执行完成：runManager.command" + runManager.getCommand());
//                contentToTxt4CrawlerAgain(folderName, seedStrs, "false");
//                dispatchVo.setStatus(WebtoolConstants.DISPATCH_STATIS_COMPLETE);
//                RedisOperator.setDispatchResult(dispatchVo, dispatchName, Constants.DISPATCH_REDIS_DBINDEX);
//            }
//        }).start();


        return resultMsg;
    }

    /**
     * 重新索引.
     *
     * @param folderNameSeed
     */
    public String reParse(String folderNameSeed, boolean isDeploy, boolean isNomal) {
        String nutch_reparse;
        String solrURL = Config.getValue(WebtoolConstants.KEY_NUTCH_SOLR_URL);
        String crawlDir = Config.getValue(WebtoolConstants.KEY_NUTCH_CRAWLDIR);
        String folderNameData = folderNameSeed.substring(0,
                folderNameSeed.lastIndexOf("_"));

        //-- 判断是否是集群还是单机模式.
        if (isDeploy) {
            nutch_reparse = Config.getValue(WebtoolConstants.KEY_NUTCH_REPARSE_DEPLOY);
        } else {
            nutch_reparse = Config.getValue(WebtoolConstants.KEY_NUTCH_REPARSE_LOCAL);
        }

        //-- 设置data目录.
        if (!isNomal) {
            folderNameData = folderNameData.substring(0, folderNameData.lastIndexOf("_")) + "_" + WebtoolConstants.INCREMENT_FILENAME_SIGN;
        }

        String data_folder = crawlDir + folderNameData + "_data";

        LOG.info("ParseAndIndex: nutch_root: " + nutch_reparse);
        LOG.info("ParseAndIndex: data_folder: " + data_folder);

        String command = "java -jar /reparseAndIndex.jar " + nutch_reparse + " " + data_folder + " " + solrURL + " true";
        LOG.info("ParseAndIndex: command:" + command);
        final RunManager runManager = getRunmanager(command);

        String resultMsg = "";
        ExecutorService es = Executors.newSingleThreadExecutor();
        Future<String> result = es.submit(new Callable<String>() {
            public String call() throws Exception {
                // the other thread
                return ShellUtils.execCmd(runManager);
            }
        });
        try {
            resultMsg = result.get();
        } catch (Exception e) {
            // failed
        }

        //ShellUtils.execCmd(runManager);

        return resultMsg;
    }

    /**
     * @param folderName
     * @param isDeploy
     * @param isNomal
     * @return
     */
    public String stopCrawl(String folderName, boolean isDeploy, boolean isNomal) {
        // 1.修改redis中种子状态
        String redisKey = "";
        if (isNomal == true) {
            redisKey = folderName + WebtoolConstants.DISPATCH_REIDIS_POSTFIX_NORMAL;
        } else {
            redisKey = folderName + WebtoolConstants.DISPATCH_REIDIS_POSTFIX_INCREMENT;
        }
        DispatchVo dispatchVo = RedisOperator.getDispatchResult(redisKey, Constants.DISPATCH_REDIS_DBINDEX);
        if (dispatchVo == null) {
            return ERROR;
        }
        List<Seed> seedList = dispatchVo.getSeed();
        if (seedList == null) {
            return ERROR;
        }
        for (Iterator<Seed> it = seedList.iterator(); it.hasNext(); ) {
            Seed seed = it.next();
            seed.setIsEnabled("false");
        }
        //todo disable to reset the status
        dispatchVo.setStatus(WebtoolConstants.DISPATCH_STATIS_START);
        RedisOperator.setDispatchResult(dispatchVo, redisKey, Constants.DISPATCH_REDIS_DBINDEX);
        // 2.修改文件中 种子状态.
        String[] folderNameArr = folderName.split("_");
        String domain = folderNameArr[0];
        String period = folderNameArr[1];
        String sequence = folderNameArr[2];
        // 2.1 修改模板种子状态.
        contextToFile(folderName);
        // 2.2 修改增量种子状态.
        String incrementFolderName = domain + "_" + "1" + period + "_" + WebtoolConstants.INCREMENT_FILENAME_SIGN + "_" + sequence;
        contextToFile(incrementFolderName);
        return SUCCESS;
    }

    /**
     * 删除爬虫种子.
     *
     * @param pageModel
     * @return
     */
    public String deleteCrawlerSeed(PageModel pageModel) {
        CrawlToolResource serviceHelper = new CrawlToolResource();
        ParseResult parseResult = serviceHelper.getParseResult(pageModel);
        String templateUrl = pageModel.getBasicInfoViewModel().getUrl();

        ArrayList<String> templateUrlList = new ArrayList<String>();
        templateUrlList.add(templateUrl);

        String pageSort = pageModel.getTemplateIncreaseViewModel().getPageSort();
        ArrayList<String> seedsTemp = TemplateFactory.getPaginationOutlink(parseResult);
        ArrayList<String> seeds = new ArrayList<String>();
        seeds.add(templateUrl);
        String incrementPageCountStr = pageModel.getTemplateIncreaseViewModel().getPageCounts();
        int incrementPageCount = Integer.valueOf(incrementPageCountStr);
        if (incrementPageCount > 0) {
            incrementPageCount = incrementPageCount - 1;
        }
        if ("升序".equals(pageSort)) {
            for (int i = 0; i < incrementPageCount && i < seedsTemp.size(); i++) {
                seeds.add(seedsTemp.get(i));
            }
        } else {
            for (int i = seedsTemp.size() - 1; i >= 0 && incrementPageCount > 0; i--, incrementPageCount--) {
                seeds.add(seedsTemp.get(i));
            }
        }

        String domain = pageModel.getScheduleDispatchViewModel().getDomain();
        String period = pageModel.getTemplateIncreaseViewModel().getPeriod();
        String sequence = pageModel.getScheduleDispatchViewModel().getSequence();

        String folderName = domain + "_" + "1" + period + "_" + sequence;
        String incrementFolderName = domain + "_" + "1" + period + "_" + WebtoolConstants.INCREMENT_FILENAME_SIGN + "_" + sequence;

        //-- 1.1 删除全量种子.
        serviceHelper.deleteSeeds(folderName, templateUrlList);
        //-- 1.2 删除增量种子.
        serviceHelper.deleteSeeds(incrementFolderName, seeds);
        //-- 1.3 删除redis中的增量种子中间状态.
        List<String> beforeSeedList = serviceHelper.getSeedListResult(templateUrl, Constants.SEEDLIST_REDIS_DEBINDEX);
        beforeSeedList.removeAll(seeds);
        serviceHelper.setSeedListResult(beforeSeedList, templateUrl, Constants.SEEDLIST_REDIS_DEBINDEX);

        // --2.保存到redis中.
        // --2.1 保存全量调度数据到redis中.
        removeNormalRedisKey(templateUrl, folderName);

        //-- 2.2 保存增量调度数据到redis中.
        removeIncrementRedisKey(folderName, seeds);
        
        return SUCCESS;
    }
    
    private String removeNormalRedisKey(String templateUrl, String folderName) {
        String normalRedisKey = folderName + WebtoolConstants.DISPATCH_REIDIS_POSTFIX_NORMAL;
        DispatchVo normalDispatchVo = RedisOperator.getDispatchResult(normalRedisKey, Constants.DISPATCH_REDIS_DBINDEX);
        if (normalDispatchVo == null) {
            LOG.info("未发现全量调度，返回" + normalRedisKey);
            return "未发现全量调度，返回";
        }
        List<Seed> normalSeedList = normalDispatchVo.getSeed();
        if (normalSeedList == null) {
            LOG.info("未发现全量调度中有种子，返回" + normalRedisKey);
            return "未发现全量调度中有种子，返回";
        }
        Seed normalSeed = new Seed(templateUrl, "false", WebtoolConstants.DISPATCH_STATIS_START);
        //--删除之前旧状态的全量种子.
        normalSeedList.remove(normalSeed);
        if (normalSeedList.isEmpty()) {
            // -- 如果删除后种子列表为空，则删除key.
            RedisOperator.delFromDispatchDB(normalRedisKey);
        } else {
            normalDispatchVo.setSeed(normalSeedList);
            RedisOperator.setDispatchResult(normalDispatchVo, normalRedisKey, Constants.DISPATCH_REDIS_DBINDEX);
        }
        return SUCCESS;
    }
    
    private String removeIncrementRedisKey(String folderName, List<String> seeds) {
        String incrementRedisKey = folderName + WebtoolConstants.DISPATCH_REIDIS_POSTFIX_INCREMENT;

        DispatchVo dispatchVo = RedisOperator.getDispatchResult(incrementRedisKey, Constants.DISPATCH_REDIS_DBINDEX);
        if (dispatchVo == null) {
            LOG.info("未发现增量调度，返回." + incrementRedisKey);
            return "未发现增量调度，返回";
        }
        List<Seed> seedList = dispatchVo.getSeed();
        if (seedList == null) {
            LOG.info("未发现增量调度中有种子，返回" + incrementRedisKey);
            return "未发现增量调度中有种子，返回";
        }
        for (Iterator<String> it = seeds.iterator(); it.hasNext(); ) {
            String seedStr = it.next();
            Seed seed = new Seed(seedStr, "false");
            seedList.remove(seed);
        }

        if (seedList.isEmpty()) {
            // -- 如果删除后种子列表为空，则删除key.
            RedisOperator.delFromDispatchDB(incrementRedisKey);
        } else {
            dispatchVo.setSeed(seedList);
            RedisOperator.setDispatchResult(dispatchVo, incrementRedisKey, Constants.DISPATCH_REDIS_DBINDEX);
        }
        return SUCCESS;
    }

    private RunManager getRunmanager(String command) {
        RunManager runManager = new RunManager();
        runManager.setHostIp(Config.getValue(WebtoolConstants.KEY_NUTCH_HOST_IP));
        runManager.setUsername(Config.getValue(WebtoolConstants.KEY_NUTCH_HOST_USERNAME));
        runManager.setPassword(Config.getValue(WebtoolConstants.KEY_NUTCH_HOST_PASSWORD));
        runManager.setPort(22);
        runManager.setCommand(command);
        return runManager;
    }

    private void contextToFile(String folderName) {
        String folderRoot = Config.getValue(WebtoolConstants.FOLDER_NAME_ROOT);
        String filePath = folderRoot + File.separator + folderName + File.separator + WebtoolConstants.SEED_FILE_NAME;
        String str = null; // 原有txt内容
        StringBuffer strBuf = new StringBuffer();// 内容更新
        BufferedReader input = null;
        BufferedWriter output = null;
        try {
            File f = new File(filePath);
            File parentDir = f.getParentFile();
            if (parentDir != null && !parentDir.exists()) {
                return;
            }
            if (!f.exists()) {
                return;
            } else {
                input = new BufferedReader(new FileReader(f));
                List<String> fileSeedList = new ArrayList<String>();
                while ((str = input.readLine()) != null) {
                    fileSeedList.add(str);
                }
                input.close();

                for (int i = 0; i < fileSeedList.size(); i++) {
                    String tempStr = fileSeedList.get(i);
                    strBuf.append("#" + tempStr + System.getProperty("line.separator"));
                }

            }
            output = new BufferedWriter(new FileWriter(f));
            output.write(strBuf.toString());
            output.close();
            String isCopy = Config.getValue(WebtoolConstants.KEY_IS_COPYFOLDER);
            if ("true".equals(isCopy)) {
                CrawlToolResource.putSeedsFolder(folderName, "local");
            }
            //TODO:
//            HdfsCommon.upFileToHdfs(filePath);
        } catch (Exception e) {
            LOG.error("生成文件错误.", e);
        } finally {
            try {
                if (input != null) {
                    input.close();
                }
                if (output != null) {
                    output.close();
                }
            } catch (IOException e) {
                LOG.error("关闭流异常.", e);
            }
        }
    }

    /*
     * 获取所有符合条件的结果List.
     */
    private List<String> getResultList(String guid, int dbindex) {
        Jedis jedis = null;
        try {
            jedis = RedisUtils.getJedis();
            jedis.select(dbindex);
            Set<String> set = jedis.keys(guid);
            List<String> resultList = new ArrayList<String>();
            resultList.addAll(set);
            return resultList;
        } catch (Exception e) {
            LOG.error("", e);
        }
        return null;
    }

    /**
     * 保存内容到文件
     */
    private void contentToTxt4CrawlerAgain(String folderName, List<String> seeds, String status) {
        String folderRoot = Config.getValue(WebtoolConstants.FOLDER_NAME_ROOT);
        String filePath = folderRoot + File.separator + folderName + File.separator + WebtoolConstants.SEED_FILE_NAME;
        String str = null; // 原有txt内容
        StringBuffer strBuf = new StringBuffer();// 内容更新
        BufferedReader input = null;
        BufferedWriter output = null;
        try {
            File f = new File(filePath);
            if (!f.exists()) {
                return;
            } else {
                input = new BufferedReader(new FileReader(f));
                List<String> fileSeedList = new ArrayList<String>();
                while ((str = input.readLine()) != null) {
                    fileSeedList.add(str);
                }
                input.close();

                // --写入未包含到本次种子中的历史数据.
                for (int i = 0; i < fileSeedList.size(); i++) {
                    String tempStr = fileSeedList.get(i);
                    String temp = tempStr;
                    if (tempStr.startsWith("#")) {
                        temp = tempStr.substring(1, tempStr.length());
                    }
                    if (!seeds.contains(temp)) {
                        strBuf.append(tempStr + System.getProperty("line.separator"));
                    }
                }
            }
            for (Iterator<String> it = seeds.iterator(); it.hasNext(); ) {
                String seedStr = it.next();
                if ("false".equals(status)) {
                    strBuf.append("#");
                }
                strBuf.append(seedStr + System.getProperty("line.separator"));
            }
            output = new BufferedWriter(new FileWriter(f));
            output.write(strBuf.toString());
            output.close();
            String isCopy = Config.getValue(WebtoolConstants.KEY_IS_COPYFOLDER);
            if ("true".equals(isCopy)) {
                CrawlToolResource.putSeedsFolder(folderName, "local");
            }
            //TODO:
//            HdfsCommon.upFileToHdfs(filePath);
        } catch (Exception e) {
            LOG.error("生成文件错误.", e);
        } finally {
            try {
                if (input != null) {
                    input.close();
                }
                if (output != null) {
                    output.close();
                }
            } catch (IOException e) {
                LOG.error("关闭流异常.", e);
            }
        }
    }
    
    public String resetCrawlerState() {
        List<String> folderNameList = getResultList("*(increment)", Constants.DISPATCH_REDIS_DBINDEX);
        List<String> normalFolderNameList = getResultList("*_dispatch", Constants.DISPATCH_REDIS_DBINDEX);
        folderNameList.addAll(normalFolderNameList);
        
        List<String> redisKeys = new ArrayList<String>();
        for (Iterator<String> it = folderNameList.iterator(); it.hasNext(); ) {
            String redisKey = it.next();
            redisKeys.add(redisKey);
        }
        List<DispatchVo> dispatchVos = RedisUtils.getDispatchListResult(redisKeys, Constants.DISPATCH_REDIS_DBINDEX);
        
        for(Iterator<DispatchVo> it = dispatchVos.iterator(); it.hasNext(); ) {
            DispatchVo dispatchVo = it.next();
            if(StringUtils.isBlank(dispatchVo.getStatus()) || WebtoolConstants.DISPATCH_STATIS_RUNNING.equals(dispatchVo.getStatus())) {
                dispatchVo.setStatus(WebtoolConstants.DISPATCH_STATIS_START);
            }
        }
        
        RedisOperator.setDispatchResultList(dispatchVos, Constants.DISPATCH_REDIS_DBINDEX);
        return SUCCESS;
    }
}
