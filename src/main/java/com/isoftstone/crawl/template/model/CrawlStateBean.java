/*
 * @(#)CrawlStateBean.java 2015-3-10 下午2:40:37 crawl-template-webtool Copyright
 * 2015 Isoftstone, Inc. All rights reserved. ISOFTSTONE
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.isoftstone.crawl.template.model;

/**
 * CrawlStateBean
 * @author danhb
 * @date  2015-3-10
 * @version 1.0
 *
 */
public class CrawlStateBean {
    private String dispatchName;

    private String crawlState;

    /**
     * @return the dispatchName
     */
    public String getDispatchName() {
        return dispatchName;
    }

    /**
     * @param dispatchName the dispatchName to set
     */
    public void setDispatchName(String dispatchName) {
        this.dispatchName = dispatchName;
    }

    /**
     * @return the crawlState
     */
    public String getCrawlState() {
        return crawlState;
    }

    /**
     * @param crawlState the crawlState to set
     */
    public void setCrawlState(String crawlState) {
        this.crawlState = crawlState;
    }

}
