/**
 * Created by lenovo on 2015/3/5.
 */
//web网站的虚拟路径
var virtualWebPath = "/crawl-template-webtool";
//列表中每页显示记录数
var paginationItemCounts = 10;

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function () {

    var mainViewModel = new masterVM([]);
    var startTime = new Date().Format('yyyy-MM-dd')+" 00:00:00";
    var endTime = new Date().Format('yyyy-MM-dd')+" 23:59:59";

    $('#startTime').val(startTime);
    $('#endTime').val(endTime);

    ko.applyBindings(mainViewModel);

    $('#startTime').datetimepicker({format: 'yyyy-mm-dd hh:ii:ss'});
    $('#endTime').datetimepicker({format: 'yyyy-mm-dd hh:ii:ss'});



    //初始化种子有效性列表测试数据
    fillPageList('seedsEffectiveStatusList', '/webapi/crawlToolService/getSeedsEffectiveStatusCache', mainViewModel, true, initSeedsEffectiveList);
    //初始化爬取状态列表
    //fillPageList('crawlStatusModelList', '/webapi/crawlToolService/getCrawlStatusCache', mainViewModel, true, initCrawlStatusList);
    fillPageList('crawlStatusModelList', '/webapi/crawlToolService/getCrawlStatusList', mainViewModel, true, initCrawlStatusList);
    //初始化爬取数据列表
    //fillPageList('crawlDataModelList', '/webapi/crawlToolService/getCrawlDataCache', mainViewModel, true, initCrawlDataList);
    fillPageList('crawlDataModelList', '/webapi/crawlToolService/getCrawlDataList?startTime=' + startTime + '&endTime=' + endTime, mainViewModel, true, initCrawlDataList);

    //注册Tab显示事件
    registerTabShownEvent(mainViewModel);
    

	$('#btn_toggle_index').change(function() {
		fillPageList('crawlStatusModelList', '/webapi/crawlToolService/getCrawlStatusList?isNormal=' +　$(this).prop('checked'), mainViewModel, true, initCrawlStatusList);
	});

});

/**
 * 
 * @param keyword
 * @param ViewModel
 */
function filterVMByKeyWords(keyword, ViewModel, currentTab) {

    switch (currentTab) {
        case "seeds_effective":
        {
            if (keyword != null && keyword != "" && ViewModel) {
                //mainViewModel.seedEffectiveVM
                //filterVMByKeyWords(that.filterString(), that.seedEffectiveVM);
                var needToUse = [];
                var totalUrl = ViewModel.seedEffectiveVM.OrgUrls();
                totalUrl.forEach(function (value, index) {
                    if (value.name.indexOf(keyword) >= 0 || value.url.indexOf(keyword) >= 0) {
                        needToUse.push(value);
                    }
                });
                //ViewModel.seedEffectiveVM.urls.removeAll();
                ViewModel.seedEffectiveVM.urls(needToUse);
            } else {
                //ViewModel.seedEffectiveVM.urls.removeAll();
                ViewModel.seedEffectiveVM.urls(ViewModel.seedEffectiveVM.OrgUrls());
            }
            ViewModel.seedEffectiveVM.paginationUrls(ViewModel.seedEffectiveVM.urls().slice(0, paginationItemCounts));
            loadPaginationComponent('#seeds_effective_pagination', ViewModel.seedEffectiveVM);
            break;
        }
        case "crawl_status":
        {
            //mainViewModel.crawlStatusVM
            //filterVMByKeyWords(that.filterString(), that.crawlStatusVM);
            if (keyword != null && keyword != "" && ViewModel) {
                var needToUse = [];
                var totalUrl = ViewModel.crawlStatusVM.OrgUrls();
                totalUrl.forEach(function (value, index) {
                    if (value.name.indexOf(keyword) >= 0 || value.url.indexOf(keyword) >= 0||value.crawlStatus.indexOf(keyword)>=0) {
                        needToUse.push(value);
                    }
                });
                ViewModel.crawlStatusVM.urls(needToUse);
            } else {
                //ViewModel.seedEffectiveVM.urls.removeAll();
                ViewModel.crawlStatusVM.urls(ViewModel.crawlStatusVM.OrgUrls());
            }
            ViewModel.crawlStatusVM.paginationUrls(ViewModel.crawlStatusVM.urls().slice(0, paginationItemCounts));
            loadPaginationComponent('#crawl_status_pagination', ViewModel.crawlStatusVM);
            break;
        }
        case "crawl_data":
        {
            //mainViewModel.crawlDataVM
            //filterVMByKeyWords(that.filterString(), that.crawlDataVM);
            if (keyword != null && keyword != "" && ViewModel) {
                var needToUse = [];
                var totalUrl = ViewModel.crawlDataVM.OrgUrls();
                totalUrl.forEach(function (value, index) {
                    if (value.name.indexOf(keyword) >= 0 || value.url.indexOf(keyword) >= 0) {
                        needToUse.push(value);
                    }
                });
                ViewModel.crawlDataVM.urls(needToUse);
            } else {
                //ViewModel.seedEffectiveVM.urls.removeAll();
                ViewModel.crawlDataVM.urls(ViewModel.crawlDataVM.OrgUrls());
            }
            ViewModel.crawlDataVM.paginationUrls(ViewModel.crawlDataVM.urls().slice(0, paginationItemCounts));
            loadPaginationComponent('#crawl_data_pagination', ViewModel.crawlDataVM);
            break;
        }
        default :
            break;
    }
    //args.paginationUrls(args.urls().slice(0, paginationItemCounts));
}

/*************************View-Model Definition Start**********************************/
/**
 *
 * @summary 种子有效性View-Model
 * */
var seedEffectiveVM = function (mainViewModel, urlData) {
    var that = this;
    var urlInitData = updateSeedsEffectiveData(urlData);
    that.urls = ko.observableArray(urlInitData);
    that.OrgUrls = ko.observableArray(urlInitData);
    //分页显示的url列表
    that.paginationUrls = ko.observableArray(urlData.slice(0, paginationItemCounts));
    //注册modal中确定按钮事件 检查种子有效性
    mainViewModel.checkSeedsEffective = function () {
        $('#modal_seedsEffectiveInfo').modal('hide');
        fillPageList('seedsEffectiveStatusList', '/webapi/crawlToolService/getSeedsEffectiveStatusList', mainViewModel, false, initSeedsEffectiveList);
    };
    //检查单个种子有效性
    that.checkSingleSeedEffective = function () {
        var self = this;
        self.effectiveStatusString('执行中..');
        self.checkTimeString('执行中..');
        sendPostRequest('/webapi/crawlToolService/refreshSeedEffectiveStatus', self, {templateId: self.templateId}, refreshSingleSeedHandler, refreshSingleSeedErrorHandler);
    };
    //显示提示
    that.showSeedEffectiveInfo = function () {
        $('#modal_seedsEffectiveInfo').modal('show');
    };
};

/**
 *
 * @summary 爬取状态View-model
 * */
var crawlStatusVM = function (mainViewModel, urlData) {
    var that = this;
    that.urls = ko.observableArray(urlData);

    that.OrgUrls = ko.observableArray(urlData);
    //分页显示的url列表
    that.paginationUrls = ko.observableArray(urlData.slice(0, paginationItemCounts));
    //刷新所有的爬取状态
    that.refreshCrawStatus = function () {
        fillPageList('crawlStatusModelList', '/webapi/crawlToolService/getCrawlStatusList', mainViewModel, false, initCrawlStatusList);
    };
    that.resetCrawStatus = function () {
    	$.ajax({
            url: virtualWebPath + '/webapi/crawlToolService/resetCrawStatus',
            type: 'GET',
            success: function (data) {
            	if (data.success) {
            		//提示
            		showOptionModalMessage('操作结果', '爬取状态重置成功！');
            	} else {
            		showOptionModalMessage('操作结果', '爬取状态重置失败！');
            	}
            },
            error: function (error) {
            	if (error) {
            		//提示
            		showOptionModalMessage('操作结果', '爬取状态重置失败！');
            	}
            }
        });
    };
    //停止爬虫
    that.stopCrawl = function () {
        var self = this;
        self.crawlStatusString('执行中..');
        self.checkTimeString('执行中..');
        var isDeploy = $('#btn_toggle_schema').prop('checked');
        var isNormal = $('#btn_toggle_index').prop('checked');
        sendPostRequest('/webapi/crawlToolService/stopCrawl', self, {
            folderName: self.url,
            isDeploy: isDeploy,
            isNormal: isNormal
        }, function (data, dataModel) {
            var json = data;//JSON.parse(data);
            if (json.success) {
                var crawlStatusModel = json.data;
                dataModel.crawlStatusString(crawlStatusModel.crawlStatus);
                dataModel.checkTimeString(crawlStatusModel.checkTime);
            }
        }, function (error) {
        });
    };
    //重新索引
    that.reParse = function () {
        var self = this;
        var isDeploy = $('#btn_toggle_schema').prop('checked');
        var isNormal = $('#btn_toggle_index').prop('checked');
        sendAjax2PostRequest('/webapi/crawlToolService/reParse', self, {
            folderName: self.url,
            isDeploy: isDeploy,
            isNormal: isNormal
        }, null, crawlStatusSuccessHandler, crawlStatusErrorHandler);
    };
    //重爬
    that.crawl = function () {
        var self = this;
        var isDeploy = $('#btn_toggle_schema').prop('checked');
        var isNormal = $('#btn_toggle_index').prop('checked');
        sendAjax2PostRequest('/webapi/crawlToolService/crawl', self, {
            folderName: self.url,
            isDeploy: isDeploy,
            isNormal: isNormal
        }, null, crawlStatusSuccessHandler, crawlStatusErrorHandler);
    };
};

/**
 *
 * 爬取状态api调用成功回调函数
 * @param {Object} data
 * @param {Object} dataModel
 * */
function crawlStatusSuccessHandler(data, dataModel) {
    $('#modal_showOptionMessageTitle').text('操作结果');
    var modalBody = $('#modal_body_showOptionMessage');
    modalBody.text('');//清空
    var result = data;//JSON.parse(data);
    modalBody.text(result.data + "\n" + result.errorMsg);
    $('#modal_showOptionMessage').modal('show');
}

/**
 *
 * 爬取状态api调用失败回调函数
 * */
function crawlStatusErrorHandler(error) {
    $('#modal_showOptionMessageTitle').text('操作结果');
    var modalBody = $('#modal_body_showOptionMessage');
    modalBody.text('');//清空
    modalBody.text(error);
    $('#modal_showOptionMessage').modal('show');
}

/**
 *
 * @summary 爬取数据View-model
 * */
var crawlDataVM = function (mainViewModel, urlData) {
    var that = this;
    that.urls = ko.observableArray(urlData);
    that.OrgUrls = ko.observableArray(urlData);
    that.typeName = ko.observable('域名');
    //分页显示的url列表
    that.paginationUrls = ko.observableArray(urlData.slice(0, paginationItemCounts));
    //按照域统计
    that.refreshCrawlData = function () {
        that.typeName('域名');
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        fillPageList('crawlDataModelList', '/webapi/crawlToolService/getCrawlDataList?startTime=' + startTime + '&endTime=' + endTime, mainViewModel, false, initCrawlDataList);
    };
    //按分类查询统计
    that.queryByDataSource = function () {
        that.typeName('分类名称');
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        fillPageList('crawlDataModelList', '/webapi/crawlToolService/getCrawlDataListByDataSource?startTime=' + startTime + '&endTime=' + endTime, mainViewModel, false, initCrawlDataList);
    };
    //刷新单条抓取数据
    that.refreshSingleData = function () {
        var self = this;
        self.indexCountsString('查询中..');
        self.checkTimeString('查询中..');
        self.todayIndexCountsString('查询中..');
        var postData = {domain: self.url, typeName: '1', dataSource: '1'};
        if (that.typeName() == '域名') {
            postData.typeName = '1';
            postData.dataSource = self.dataSource;
        } else if (that.typeName() == '分类名称') {
            postData.typeName = '2';
            postData.dataSource = self.dataSource;
        }
        sendPostRequest('/webapi/crawlToolService/refreshCrawlData', self, postData, refreshSingleDataHandler, refreshSingleDataErrorHandler);
    };

    that.sort = function (args, event) {
        var self = this;
        var sk = event.target.attributes["sortkey"].value;
        if (sk) {
            switch (sk) {
                case "totalIndex":
                {
                    args.urls().sort(function (a, b) {
                        return a.indexCountsString() < b.indexCountsString() ? 1 : a.indexCountsString() > b.indexCountsString() ? -1 : a.indexCountsString() == b.indexCountsString() ? 0 : 0;
                    });
                    break;
                }
                case "todayIndex":
                {
                    args.urls().sort(function (a, b) {
                        return a.todayIndexCountsString() < b.todayIndexCountsString() ? 1 : a.todayIndexCountsString() > b.todayIndexCountsString() ? -1 : a.todayIndexCountsString() == b.todayIndexCountsString() ? 0 : 0;
                    });
                    break;
                }
                case "todayPublish":
                {
                    args.urls().sort(function (a, b) {
                        return a.todayPublishCountsString() < b.todayPublishCountsString() ? 1 : a.todayPublishCountsString() > b.todayPublishCountsString() ? -1 : a.todayPublishCountsString() == b.todayPublishCountsString() ? 0 : 0;
                    });
                    break;
                }
            }
            args.paginationUrls(args.urls().slice(0, paginationItemCounts));
        }
    }

    that.totalIndexSum = ko.computed(function () {
        var tpTotal = 0;
        for (var i = 0; i < that.urls().length; i++) {
            tpTotal = tpTotal + parseInt(that.urls()[i].indexCounts);
        }
        return tpTotal;
    });
    that.totalTodayIndexSum = ko.computed(function () {
        var tpTotal = 0;
        for (var i = 0; i < that.urls().length; i++) {
            tpTotal = tpTotal + parseInt(that.urls()[i].todayIndexCounts);
        }
        return tpTotal;
    });
    that.totalPublishTimeSum = ko.computed(function () {
        var tpTotal = 0;
        for (var i = 0; i < that.urls().length; i++) {
            tpTotal = tpTotal + parseInt(that.urls()[i].todayPublishTimeCounts);
        }
        return tpTotal;
    });
};

/**
 *
 * @summary 页面主体View-Model类
 * */
var masterVM = function (urlData) {
    var that = this;
    that.filterString = ko.observable('');
    that.seedEffectiveVM = new seedEffectiveVM(that, urlData);
    that.crawlStatusVM = new crawlStatusVM(that, urlData);
    that.crawlDataVM = new crawlDataVM(that, urlData);

    this.filterModel = function (args, event) {
        var currentTabID = $("ul#statusTab li.active>a").attr("aria-controls");
        if (currentTabID) {
            filterVMByKeyWords(that.filterString(), args, currentTabID);
        }
    };
};
/*************************View-Model Definition End**********************************/

/**
 *
 * 刷新种子有效性 回调函数
 * @param {Object} data
 * @param {Object} dataModel
 * */
function refreshSingleSeedHandler(data, dataModel) {
    var json = data;//JSON.parse(data);
    if (json.success) {
        var seedsEffective = json.data;
        dataModel.effectiveStatusString(seedsEffective.effectiveStatus);
        dataModel.checkTimeString(seedsEffective.checkTime);
    }
}


/**
 *
 * 刷新数据失败 回调函数
 * */
function refreshSingleSeedErrorHandler(error) {
}

/**
 *
 * 刷新爬取状态数据成功 回调函数
 * @param {Object} data
 * @param {Object} dataModel
 * */
function refreshSingleDataHandler(data, dataModel) {
    var json = data;//JSON.parse(data);
    if (json.success) {
        var crawlDataModel = json.data;
        dataModel.indexCountsString(crawlDataModel.indexCounts);
        dataModel.checkTimeString(crawlDataModel.checkTime);
        dataModel.todayIndexCountsString(crawlDataModel.todayIndexCounts);
    }
}

/**
 *
 * 刷新数据失败 回调函数
 * */
function refreshSingleDataErrorHandler(error) {
}

/**
 *
 * 发送post请求
 * @param {String} url
 * @param {Object} dataModel
 * @param {Object} data
 * @param {Function} successHandler
 * @param {Function} errorHandler
 * */
function sendPostRequest(url, dataModel, data, successHandler, errorHandler) {
    $.ajax({
        url: virtualWebPath + url,
        type: 'POST',
        data: data,
        success: function (data) {
            successHandler(data, dataModel);
        },
        error: function (error) {
            errorHandler(error, dataModel);
        }
    });
}

/**
 *
 * 发送post请求
 * @param {String} url
 * @param {Object} dataModel
 * @param {Object} data
 * @param {String} targetElement
 * @param {Function} successHandler
 * @param {Function} errorHandler
 * */
function sendAjax2PostRequest(url, dataModel, data, targetElement, successHandler, errorHandler) {
    $.ajax2({
        url: virtualWebPath + url,
        type: 'POST',
        data: data,
        success: function (data) {
            successHandler(data, dataModel);
        },
        error: function (error) {
            errorHandler(error, dataModel);
        }
    }, targetElement);
}

/**
 *
 * ajax get请求填充页面列表数据
 * @param {String} listType 需要填充的页面列表类型
 * @param {String} url 接口调用url
 * @param {Object} mainViewModel 页面View-Model
 * @param {Boolean} isPageLoad 页面是否第一次加载
 * @param {Function} callback 回调函数
 * */
function fillPageList(listType, url, mainViewModel, isPageLoad, callback) {
    $.ajax2({
        url: encodeURI( virtualWebPath + url),
        type: 'GET',
        success: function (data) {
            var json = data;//JSON.parse(data);
            if (json.success) {
                switch (listType) {
                    case 'seedsEffectiveStatusList'://种子有效性列表
                    {
                        if (json.data.seedsEffectiveStatusList != null) {
                            callback(isPageLoad, mainViewModel, json.data.seedsEffectiveStatusList);
                        } else {
                            callback(isPageLoad, mainViewModel, []);
                        }
                    }
                        break;
                    case 'crawlStatusModelList'://爬取状态
                    {
                        if (json.data.crawlStatusModelList != null) {
                            callback(isPageLoad, mainViewModel, json.data.crawlStatusModelList);
                        } else {
                            callback(isPageLoad, mainViewModel, []);
                        }
                    }
                        break;
                    case 'crawlDataModelList'://爬取数据
                    {
                        if (json.data.crawlDataModelList != null) {
                            callback(isPageLoad, mainViewModel, json.data.crawlDataModelList);
                        } else {
                            callback(isPageLoad, mainViewModel, []);
                        }
                    }
                        break;
                }
            } else {
                callback(isPageLoad, mainViewModel, []);
            }
        },
        error: function (error) {
            callback(isPageLoad, mainViewModel, []);
        }
    });
}

/**
 *
 * 初始化列表数据
 * @param {Array} urlData url列表
 * */
function updateSeedsEffectiveData(urlData) {
    var seedsUrlInitData = [];
    if (urlData) {
        for (var i = 0; i < urlData.length; i++) {
            var model = urlData[i];
            if (model == null) {
                continue;
            }
            model.updateUrl = "../template-main.html?templateGuid=" + model.templateId;
            model.targetWindow = "_blank";
            //添加ko绑定 种子有效性
            model.effectiveStatusString = ko.observable(model.effectiveStatus);
            //添加ko 绑定 检查时间
            model.checkTimeString = ko.observable(model.checkTime);
            seedsUrlInitData.push(model);
        }
    }
    return seedsUrlInitData;
}


/**
 *
 * 注册Tab显示事件
 * */
function registerTabShownEvent(mainViewModel) {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = e.target.hash; // newly activated tab
        if (target == "#seeds_effective") {
            //初始化种子有效性列表测试数据
            fillPageList('seedsEffectiveStatusList', '/webapi/crawlToolService/getSeedsEffectiveStatusCache', mainViewModel, true, initSeedsEffectiveList);
        }
        else if (target == '#crawl_status') {
            //初始化爬取状态列表
            fillPageList('crawlStatusModelList', '/webapi/crawlToolService/getCrawlStatusList', mainViewModel, true, initCrawlStatusList);
        } else if (target == '#crawl_data') {
            var startTime = $("#startTime").val();
            var endTime = $("#endTime").val();
            //初始化爬取数据列表
            fillPageList('crawlDataModelList', '/webapi/crawlToolService/getCrawlDataList?startTime=' + startTime + '&endTime=' + endTime, mainViewModel, true, initCrawlDataList);
        }
    });
}

/**
 *
 * @summary 种子有效性列表
 * @param {Boolean} isPageLoad 判断页面是否第一次加载
 * @param {Object} mainViewModel 整个页面的View-Model对象
 * @param {Object|Array} initData 初始化数据
 * */
function initSeedsEffectiveList(isPageLoad, mainViewModel, initData) {
    var updatedSampleData = updateSeedsEffectiveData(initData);
    mainViewModel.seedEffectiveVM.urls(updatedSampleData);
    mainViewModel.seedEffectiveVM.OrgUrls(updatedSampleData.concat());
    mainViewModel.seedEffectiveVM.paginationUrls(mainViewModel.seedEffectiveVM.urls().slice(0, paginationItemCounts));
    //加载种子有效性页面分页控件
    loadPaginationComponent('#seeds_effective_pagination', mainViewModel.seedEffectiveVM);
//    if (!isPageLoad) {
//        //提示
//        showOptionModalMessage('操作结果', '检查种子有效性操作已执行完毕！');
//    }
}

/**
 *
 * 显示操作提示
 * @param {String}　title 提示框标题
 * @param {String} message 提示信息
 * */
function showOptionModalMessage(title, message) {
    //显示操作成功提示
    $('#modal_showOptionMessageTitle').text(title);
    var modalBody = $('#modal_body_showOptionMessage');
    modalBody.text('');//清空
    modalBody.text(message);//清空
    $('#modal_showOptionMessage').modal('show');
}

/**
 *
 * 构造新的数据ko数据
 * */
function updateInitCrawlStatus(initData) {
    var crawlStatusList = [];
    if (initData) {
        for (var i = 0; i < initData.length; i++) {
            var model = initData[i];
            if (model == null) {
                continue;
            }
            //添加ko绑定 爬取状态
            model.crawlStatusString = ko.observable(model.crawlStatus);
            //添加ko 绑定 检查时间
            model.checkTimeString = ko.observable(model.checkTime);
            crawlStatusList.push(model);
        }
    }

    return crawlStatusList;
}

/**
 *
 * @summary 爬取状态列表
 * @param {Boolean} isPageLoad 判断页面是否第一次加载
 * @param {Object} mainViewModel 整个页面的View-Model对象 *
 * @param {Object|Array} initData 初始化数据
 * */
function initCrawlStatusList(isPageLoad, mainViewModel, initData) {
    var updatedData = updateInitCrawlStatus(initData);
    mainViewModel.crawlStatusVM.urls(updatedData);
    mainViewModel.crawlStatusVM.OrgUrls(updatedData.concat());
    mainViewModel.crawlStatusVM.paginationUrls(mainViewModel.crawlStatusVM.urls().slice(0, paginationItemCounts));
    //加载爬取数据页面分页控件
    loadPaginationComponent('#crawl_status_pagination', mainViewModel.crawlStatusVM);
    if (!isPageLoad) {
        //提示
        showOptionModalMessage('操作结果', '爬取状态查询完毕！');
    }

}

/**
 *
 * 构造新的数据ko数据
 * */
function updateInitCrawlData(initData) {
    var crawlDataList = [];
    if (initData) {
        for (var i = 0; i < initData.length; i++) {
            var model = initData[i];
            if (model == null) {
                continue;
            }
            //添加ko绑定 索引条数
            model.indexCountsString = ko.observable(model.indexCounts);
            //添加ko 绑定 检查时间
            model.checkTimeString = ko.observable(model.checkTime);
            //今日索引
            model.todayIndexCountsString = ko.observable(model.todayIndexCounts);

            model.todayPublishCountsString = ko.observable(model.todayPublishTimeCounts);

            crawlDataList.push(model);
        }
    }

    return crawlDataList;
}

/**
 *
 * @summary 爬取数据列表
 * @param {Boolean} isPageLoad 判断页面是否第一次加载
 * @param {Object} mainViewModel 整个页面的View-Model对象
 * @param {Object|Array} initData 初始化数据
 * */
function initCrawlDataList(isPageLoad, mainViewModel, initData) {
    var updatedData = updateInitCrawlData(initData);
    mainViewModel.crawlDataVM.urls(updatedData);
    mainViewModel.crawlDataVM.OrgUrls(updatedData.concat());
    mainViewModel.crawlDataVM.paginationUrls(mainViewModel.crawlDataVM.urls().slice(0, paginationItemCounts));
    //加载爬取状态页面分页控件
    loadPaginationComponent('#crawl_data_pagination', mainViewModel.crawlDataVM);
    if (!isPageLoad) {
        //提示
        showOptionModalMessage('操作结果', '爬取数据查询完毕！');
    }
}

/**
 *
 * 种子有效性测试数据
 * */
function seedEffectiveSampleData() {
    var sampleData = [
        {name: '上海证券报-信托研究', url: 'http://caifu.cnstock.com/list/xingtuo_yanjiu', effectiveStatus: '有效'},
        {name: '上海证券报-信托调查', url: 'http://caifu.cnstock.com/list/xingtuo_diaocha', effectiveStatus: '有效'}
    ];
    return sampleData;
}

/**
 *
 * 爬取状态测试数据
 * */
function crawlStatusSampleData() {
    var sampleData = [
        {name: '上海证券报-信托研究', url: 'http://caifu.cnstock.com/list/xingtuo_yanjiu', crawlStatus: '爬去中'},
        {name: '上海证券报-信托调查', url: 'http://caifu.cnstock.com/list/xingtuo_diaocha', crawlStatus: '注入'}
    ];
    return sampleData;
}

/**
 *
 * 爬取数据测试数据
 * */
function crawlDataSampleData() {
    var sampleData = [
        {
            name: '上海证券报-信托研究',
            url: 'http://caifu.cnstock.com/list/xingtuo_yanjiu',
            indexCounts: '2890',
            todayIndexCounts: '289'
        },
        {
            name: '上海证券报-信托调查',
            url: 'http://caifu.cnstock.com/list/xingtuo_diaocha',
            indexCounts: '2234',
            todayIndexCounts: '123'
        }
    ];
    return sampleData;
}

/**
 *
 * 加载分页组件
 * @param {String} paginationDomElement 加载分页的DOM元素
 * @param {Object} viewModel 需要分页的ViewModel
 * *
 * */
function loadPaginationComponent(paginationDomElement, viewModel) {
    var totalCount = viewModel.urls().length;
    $(paginationDomElement).pagination({
        items: totalCount,
        itemsOnPage: paginationItemCounts,
        cssStyle: 'light-theme',
        prevText: '上一页',
        nextText: '下一页',
        onPageClick: function (pageNumber, eTarget) {
            var originalUrls = viewModel.urls();
            var dataIndex = (pageNumber - 1) * paginationItemCounts;
            var itemsCounts = dataIndex + paginationItemCounts;
            var nextPageUrls = originalUrls.slice(dataIndex, itemsCounts);
            viewModel.paginationUrls(nextPageUrls);
        }
    });
}

/******重写Ajax操作,做成通用Loading操作*******/
$.ajax2 = function (options, aimDiv) {
    var img = $("<img id=\"progressImgage\"  src=\"../../image/load.gif\" />"); //Loading小图标
    var mask = $("<div id=\"maskOfProgressImage\"></div>").addClass("mask"); //Div遮罩
    var PositionStyle = "fixed";
    //是否将Loading固定在aimDiv中操作,否则默认为全屏Loading遮罩
    if (aimDiv != null && aimDiv != "" && aimDiv != undefined) {
        $(aimDiv).css("position", "relative").append(img).append(mask);
        PositionStyle = "absolute";
    }
    else {
        $("body").append(img).append(mask);
    }
    img.css({
        "z-index": "2000",
        "display": "none"
    });
    mask.css({
        "position": PositionStyle,
        "top": "0",
        "right": "0",
        "bottom": "0",
        "left": "0",
        "z-index": "1000",
        "background-color": "#000000",
        "display": "none"
    });
    var complete = options.complete;
    options.complete = function (httpRequest, status) {
        img.hide();
        mask.hide();
        if (complete) {
            complete(httpRequest, status);
        }
    };
    options.async = true;
    img.show().css({
        "position": PositionStyle,
        "top": "40%",
        "left": "50%",
        "margin-top": function () {
            return -1 * img.height() / 2;
        },
        "margin-left": function () {
            return -1 * img.width() / 2;
        }
    });
    mask.show().css("opacity", "0.1");
    $.ajax(options);
};