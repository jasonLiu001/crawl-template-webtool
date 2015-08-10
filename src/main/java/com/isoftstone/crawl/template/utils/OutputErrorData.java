/*
 * @(#)OutputErrorData.java 2015-6-11 上午10:56:25
 * crawl-template-webtool
 * Copyright 2015 Isoftstone, Inc. All rights reserved.
 * ISOFTSTONE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.isoftstone.crawl.template.utils;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import jodd.io.FileUtil;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.joda.time.DateTime;

import com.isoftstone.crawl.template.consts.WebtoolConstants;

/**
 * OutputErrorData
 * @author danhb
 * @date  2015-6-11
 * @version 1.0
 *
 */
public class OutputErrorData {
    
    private static final Log LOG = LogFactory.getLog(OutputErrorData.class);
    
    /**
     * 将错误日志进行拼接
     * 
     * @param list
     * @return String
     */
    public synchronized static String joinString(List<String> list) {
        StringBuffer buffer = new StringBuffer();
        for (String msg : list) {
            buffer.append(msg).append(WebtoolConstants.WRAP);
        }
        return buffer.toString();
    }

    /**
     * 创建错误日志文件
     * 
     * @param perfix
     * @return File
     */
    public synchronized static <T> File buildErrorFile(String perfix) {
//        String dirs = WebtoolConstants.PROGRAM_ROOT_DIR + File.separator + WebtoolConstants.PRE_DIR + WebtoolConstants.LOG_DIR
//                + File.separator;
        String dirs = "/logs" + File.separator;
        try {
            FileUtil.mkdirs(dirs);
        } catch (IOException e) {
            LOG.error("Build " + perfix + " dir failure!....", e);
        }
        String date = OutputErrorData.format(new Date(), "yyyy-MM-dd");
        return new File(dirs + perfix + date + WebtoolConstants.FILENAME_EXT_LOG);
    }
    
    /**
     * 格式化时间
     * 
     * @param srcDate
     * @param destFormat
     * @return
     */
    public static String format(Date srcDate, String destFormat) {
        return new DateTime(srcDate).toString(destFormat);
    }
    
    public synchronized static void output(List<String> list) {
        try {
            FileUtil.appendString(buildErrorFile("template_importseeds_error_"), joinString(list));
        } catch (IOException e) {
           LOG.error("Output error message failure!...", e);
        }
    }
}
