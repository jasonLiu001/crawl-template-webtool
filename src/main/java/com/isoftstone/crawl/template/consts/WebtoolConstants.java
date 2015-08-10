/*
 * @(#)WebtoolConstants.java 2015-1-7 下午1:59:48 crawl-template-webtool Copyright
 * 2015 Isoftstone, Inc. All rights reserved. ISOFTSTONE
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.isoftstone.crawl.template.consts;

/**
 * WebtoolConstants
 *
 * @author danhb
 * @version 1.0
 * @date 2015-1-7
 */
public class WebtoolConstants {
    /**
     * config.propertis中文件根目录的key.
     */
    public static final String FOLDER_NAME_ROOT = "FOLDER_NAME_ROOT";

    public static final String URL_STATUS_FALSE = "false";

    public static final String DISPATCH_REIDIS_POSTFIX_NORMAL = "_dispatch";

    public static final String DISPATCH_REIDIS_POSTFIX_INCREMENT = "_dispatch(increment)";

    public static final String DISPATCH_STATIS_START = "start";

    public static final String DISPATCH_STATIS_RUNNING = "running";

    public static final String DISPATCH_STATIS_COMPLETE = "complete";

    public static final String SEED_FILE_NAME = "seed.txt";

    public static final String INCREASE_TEMPLATE_PARTERN = "_increasetemplate";

    public static final String KEY_HDFS_ROOT_FOLDER = "hdfsRootFolder";

    public static final String KEY_IS_COPYFOLDER = "isCopyFile";

    public static final String KEY_HOST_IP = "hostip";
    public static final String KEY_HOST_USERNAME = "hostUserName";
    public static final String KEY_HOST_PASSWORD = "hostPassword";
    public static final String KEY_DES_FOLDER = "desFolderName";
    public static final String KEY_NUTCH_HOST_IP = "nutchHostip";
    public static final String KEY_NUTCH_HOST_USERNAME = "nutchHostUserName";
    public static final String KEY_NUTCH_HOST_PASSWORD = "nutchHostPassword";


    public static final String KEY_NUTCH_CRAWLDIR = "crawlDir";
    public static final String KEY_NUTCH_SOLR_URL = "solrURL";

    // -- increment
    public static final String KEY_NUTCH_LOCAL_INCREMENT_SHDIR = "localIncrementShDir";
    public static final String KEY_NUTCH_DEPLOY_INCREMENT_SHDIR = "deployIncrementShDir";
    public static final String KEY_NUTCH_LOCAL_INCREMENT_PROXY_SHDIR = "localIncrementProxyShDir";
    public static final String KEY_NUTCH_DEPLOY_INCREMENT_PROXY_SHDIR = "deployIncrementProxyShDir";

    // -- normal
    public static final String KEY_NUTCH_DEPLOY_NORMAL_SHDIR = "deployNormalShDir";
    public static final String KEY_NUTCH_DEPLOY_NORMAL_PROXY_SHDIR = "deployNormalProxyShDir";
    public static final String KEY_NUTCH_LOCAL_NORMAL_SHDIR = "localNormalShDir";
    public static final String KEY_NUTCH_LOCAL_NORMAL_PROXY_SHDIR = "localNormalProxyShDir";
    public static final String KEY_HDFS_ROOT_PREFIX = "hdfsRootPrefix";


    public static final String KEY_NUTCH_REPARSE_LOCAL = "localReParse";
    public static final String KEY_NUTCH_REPARSE_DEPLOY = "deployReParse";

    //--TODO:
    public static final String KEY_NUTCH_HOST_IP_TEST = "nutchHostIp";


    public static final String BAIDU_SEARCH_NAME = "百度新闻搜索";
    public static final String BING_SEARCH_NAME = "Bing新闻搜索";
    public static final String SOUGOU_SEARCH_NAME = "搜狗新闻搜索";
    public static final String NORMAL_TEMPLATE_NAME = "普通模板";

    //批量生成搜索引擎模板时，添加的模板tag属性
    public static final String SEARCH_ENGINE_TAGS_CATAGRAY = "分类";

    public static final String BAIDU_NEWS_ENGINE = "baidu_news";
    public static final String BING_NEWS_ENGINE = "bing_news";
    public static final String SOUGOU_NEWS_ENGINE = "sogou_news";

    public static final String SEARCH_KEYWORD_API_URL = "SEARCH_KEYWORD_API_URL";

    //模板列表文件后缀
    public static final String TEMPLATE_LIST_KEY_PARTERN = "_templatelist";
    //模板导出文件后缀
    public static final String TEMPLATE_FILE_EXTENTIONS_NAME = ".txt";
    //种子有效性文件 缓存Key
    public static final String SEEDS_EFFECTIVE_STATUS = "seeds_effective_status";

    //-- 增量文件夹命名标识.
    public static final String INCREMENT_FILENAME_SIGN = "increment";

    public static final String FILTER_REPLACE = "替换";
    public static final String FILTER_MATCH = "匹配";
    public static final String FILTER_REMOVE = "移除";
    public static final String FORMAT_DATE = "日期";

    //列表分页类型
    public static final String PAGINATION_PAGENUMBER = "分页的末尾页数";
    public static final String PAGINATION_PAGENUMBER_INTERVAL = "分页步进数";
    public static final String PAGINATION_PAGERECORD = "获取分页的记录数";
    public static final String PAGINATION_PAGE = "获取分页URL";
    public static final String PAGINATION_CUSTOM = "自定义分页";

    //种子有效性
    public static final String TEMPLATE_VALID_STATUS = "有效";
    public static final String TEMPLATE_INVALID_STATUS = "无效";

    //爬虫数据查询字段
    public static final String CRAWL_DATA_QUERY_FIELD = "fetch_time";

    public static final String CRAWL_DATA_PUBLISH_TIME_QUERY_FIELD = "publish_time";

    //自定义选择器属性
    public static final String CUSTOMER_SELECTOR_ATTRIBUTE = "其他";

    public static final String[] DATE_PATTEN = new String[]{"yyyy-MM", "yyyyMM", "yyyy/MM",
            "yyyyMMdd", "yyyy-MM-dd", "yyyy/MM/dd",
            "yyyyMMddHHmmss",
            "yyyy-MM-dd HH:mm:ss",
            "yyyy/MM/dd HH:mm:ss"};
    
    /** 程序运行根目录 */
    public static String PROGRAM_ROOT_DIR = System.getProperty("user.dir");
    
    /** 系统默认日志文件 */
    public static final String LOG_DIR = "logs";

    /** 往上级跳一级目录 */
    public static final String PRE_DIR = "../";
    
    /** log文件扩展名 */
    public static final String FILENAME_EXT_LOG = ".log";
    
    /** 换行 */
    public static final String WRAP = "\r\n";

}
