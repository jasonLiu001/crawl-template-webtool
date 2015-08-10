package com.isoftstone.crawl.template.crawlstate;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.isoftstone.crawl.template.vo.RunManager;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.isoftstone.crawl.template.consts.WebtoolConstants;
import com.isoftstone.crawl.template.utils.Config;
import com.isoftstone.crawl.template.utils.ShellUtils;

/**
 * Created by Administrator on 2015/1/14.
 */

public class ReParseAndIndex {

    private static final Log LOG = LogFactory.getLog(ReParseAndIndex.class);

    public static void main(String[] args) {
        String nutch_root = args[0];
        String data_folder = args[1];
        String solr_index = args[2];
        boolean filter = Boolean.parseBoolean(args[3]);
        reParseAndIndex(nutch_root, data_folder, solr_index, filter);
    }

    public static void reParseAndIndex(String nutch_root, String data_folder, String solr_index, boolean filter) {
        List<String> segParseList = new ArrayList<String>();
        List<String> segIndexList = new ArrayList<String>();

        File tpFile = new File(data_folder);
        LOG.info("tpFile:" + tpFile);
        if (tpFile.isDirectory()) {
            File[] secfis = tpFile.listFiles();
            for (File sectpFile : secfis) {
                if (sectpFile.isDirectory() && sectpFile.getName().equals(new String("segments"))) {
                    String tpindexPath = sectpFile.getPath();
                    tpindexPath = tpindexPath.substring(0, tpindexPath.indexOf(new String("segments")));
                    segIndexList.add(tpindexPath);
                    File[] thirdFile = sectpFile.listFiles();
                    for (File thirdtpFile : thirdFile) {
                        segParseList.add(thirdtpFile.getPath());
                        File[] finalFile = thirdtpFile.listFiles(new FileFilter() {
                            @Override
                            public boolean accept(File pathname) {
                                if (pathname.isDirectory()) {
                                    if (pathname.getName().equals(new String("crawl_parse"))
                                            || pathname.getName().equals(new String("parse_data"))
                                            || pathname.getName().equals(new String("parse_text"))) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            }
                        });
                        if (filter) {
                            for (int l = 0; l < finalFile.length; l++) {
                                removeDir(finalFile[l]);
                            }
                        }
                    }
                }
            }
        }
        if (filter) {
            for (String segment : segParseList) {
                //parse
                String tpStrParse = nutch_root + " parse %s";
                excuteCmd(String.format(tpStrParse, segment));

                String temp = segment.substring(0, segment.indexOf("segments"));
                //更新crawldb
                String updatedbStr = nutch_root + " updatedb %scrawldb %s";
                excuteCmd(String.format(updatedbStr, temp, segment));

                //更新linkdb
                String invertlinksStr = nutch_root
                        + " invertlinks %slinkdb %s -noFilter";
                excuteCmd(String.format(invertlinksStr, temp, segment));
                //过滤重复
                String dedupStr = nutch_root + " dedup %scrawldb";
                excuteCmd(String.format(dedupStr, temp));
            }
        }

        for (String segs : segIndexList) {
            //索引
            String tpStrIndex = nutch_root + " solrindex " + solr_index
                    + " %scrawldb -linkdb %slinkdb -dir %ssegments";
            excuteCmd(String.format(tpStrIndex, segs, segs, segs));
        }
    }

    public static void excuteCmd(String cmd) {
        try {
            LOG.info("command:" + cmd);
            Runtime rt = Runtime.getRuntime();
            Process proc = rt.exec(cmd);
            InputStream stdin = proc.getInputStream();
            InputStreamReader isr = new InputStreamReader(stdin);
            BufferedReader br = new BufferedReader(isr);
            String line = null;
            LOG.info("<output></output>");
            while ((line = br.readLine()) != null)
                LOG.info(line);
            LOG.info("");
            int exitVal = proc.waitFor();
            LOG.info("Process exitValue: " + exitVal);
        } catch (Exception e) {
            LOG.info("执行异常.", e);
        }

    }

    public static void excuteCmdRunmanager(String cmd) {
        RunManager runManager = new RunManager();
        runManager.setHostIp(Config.getValue(WebtoolConstants.KEY_NUTCH_HOST_IP));
        runManager.setUsername(Config.getValue(WebtoolConstants.KEY_NUTCH_HOST_USERNAME));
        runManager.setPassword(Config.getValue(WebtoolConstants.KEY_NUTCH_HOST_PASSWORD));
        runManager.setPort(22);
        runManager.setCommand(cmd);
        ShellUtils.execCmd(runManager);
    }

    public static void removeDir(File dir) {
        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                removeDir(file);
            } else
                LOG.info(file + ":" + file.delete());
        }
        LOG.info(dir + "----" + dir.delete());
    }
}
