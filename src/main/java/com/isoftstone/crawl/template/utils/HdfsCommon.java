package com.isoftstone.crawl.template.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import com.isoftstone.crawl.template.consts.WebtoolConstants;

public class HdfsCommon {

    private static final Log LOG = LogFactory.getLog(HdfsCommon.class);

    /**
     * 针对linux文件系统，将其本地文件上传到Hdfs上.
     * @param fileName 本地文件目录.
     * @throws IOException
     */
    public static void upFileToHdfs(String fileName) {
        // 将本地文件上传到hdfs。
        //"hdfs://192.168.100.231:8020/user/hdfs/tmp1/"
        String target = Config.getValue(WebtoolConstants.KEY_HDFS_ROOT_FOLDER);
        if (StringUtils.isBlank(target)) {
            return;
        }
        Configuration config = new Configuration();
        FileSystem fs = null;
        FileInputStream fis = null;
        OutputStream os = null;
        try {
            fs = FileSystem.get(URI.create(target), config);
            fis = new FileInputStream(new File(fileName));
            os = fs.create(new Path(target + fileName));
            // copy
            IOUtils.copyBytes(fis, os, 4096, true);
        } catch (IOException e) {
            LOG.error("", e);
        } finally {
            try {
                if(fs != null) {
                    fs.close();
                }
                if(fis != null) {
                    fis.close();
                }
                if(os != null) {
                    os.close();
                }
                
            } catch (IOException e) {
                LOG.error("关闭流异常.", e);
            }

        }
    }

}
