/**
 * Created by wang on 2014/12/9.
 */
//web网站的虚拟路径
var virtualWebPath = "/crawl-template-webtool";

/**************Models****************/
/**
 *
 * 自定义属性初始化model对象
 * */
function customerAttrModel(target, selector, attr, otherAttr, filter, filterCategory, formatCategory, formatter, filterReplaceTo) {
    this.target = target;
    this.selector = selector;
    this.attr = attr;
    this.otherSelector = otherAttr;
    this.filter = filter;
    this.filterCategory = filterCategory;
    this.formatCategory = formatCategory;
    this.formatter = formatter;
    this.filterReplaceTo = filterReplaceTo;
}

/**
 *
 * 模板静态属性Tag Model对象
 * */
function templateTagModel(tagKey, tagValue) {
    this.tagKey = tagKey;
    this.tagValue = tagValue;
}
/**************Models****************/


/**************View-Models****************/
/**
 *
 * 自定义属性的单个Model视图
 * */
function singleCustomerViewModel() {
    this.parseEngine = ko.observableArray(['jsoup', 'xpath']);
    this.id = ko.observable();
    this.target = ko.observable();
    this.selector = ko.observable();
    this.otherSelector = ko.observable();
    this.attr = ko.observableArray(['href', 'text', 'src', 'html', '其他']);
    this.attrSelected = ko.observable('text');
    this.filterCategory = ko.observableArray([ '匹配', '替换', '移除']);
    this.filterCategorySelected = ko.observable('匹配');
    this.filter = ko.observable();
    this.formatter = ko.observable();
    this.formatCategory = ko.observableArray(['日期']);
    this.formatCategorySelected = ko.observable('日期');
    this.showMatchFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '匹配') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showRemoveFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '移除') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showReplaceFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '替换') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.filterReplaceTo = ko.observable();
    this.showOtherSelectorInput = ko.computed(function () {
        if (this.attrSelected() == '其他') {
            return true;
        } else {
            this.otherSelector('');
            return false;
        }
    }, this);
}

/**
 *
 * 调度任务的View-Model
 * */
function scheduleDispatchViewModel() {
    this.periods = ko.observableArray(['hour', 'day', 'week']);
    this.periodsSelected = ko.observable('hour');
    this.sequence = ko.observable();
    this.useProxy = ko.observable(false);
}

/**
 *
 * 单个Tag的View-Model
 * */
function singleTemplateTagViewModel() {
    this.tagKey = ko.observable();
    this.tagValue = ko.observable();
}

/**
 *
 * 模板静态属性的View-Model
 * */
function templateTagsViewModel() {
    this.tags = ko.observableArray();
    this.addTag = function () {
        this.tags.push(new singleTemplateTagViewModel());
    }.bind(this);
    this.removeTag = function (item) {
        this.tags.remove(item);
    }.bind(this);
}

/**
 *
 * 增量配置的View-Model
 * */
function templateIncreaseViewModel() {
    this.periods = ko.observableArray(['hour', 'day', 'week']);
    this.periodsSelected = ko.observable('hour');
    this.pageCounts = ko.observable();
    this.pageSort = ko.observableArray(['升序', '倒序']);
    this.pageSortSelected = ko.observable('升序');
}

/**
 *
 * 基本信息View-Model
 * */
function basicInfoViewModel() {
    this.id = ko.observable('');
    this.url = ko.observable();
    this.name = ko.observable();
    this.tags = ko.observableArray(['财经', '体育', '经济']);
    this.tagsSelected = ko.observable('财经');
    this.templateTypes = ko.observableArray(['普通模板', '百度新闻搜索', 'Bing新闻搜索', '搜狗新闻搜索']);
    this.templateTypesSelected = ko.observable('普通模板');
    this.currentString = ko.observable();
    this.viewHtmlContent = function () {
        var url = this.url;
        $('#modalHtmlTitle').text('Html内容');
        $('#modal-viewHtml').modal('show');
        $.ajax({
            url: virtualWebPath + '/webapi/crawlToolService/viewHtmlContent',
            type: 'POST',
            data: {
                webUrl: url
            },
            success: function (result) {
                var modalBody = $('#modal-viewHtml-body');
                modalBody.text('');//清空
                var json =result; // JSON.parse(result);
                if (json.success) {
                    modalBody.text(json.data);
                } else {
                    modalBody.text(json.errorMsg);
                }

            },
            error: function () {
            }
        });
    }.bind(this);
    this.showSearchTemplateElement = ko.computed(function () {
        if (this.templateTypesSelected() == '普通模板') {
            return false;
        } else {
            return true;
        }
    }, this);
}

/**
 *
 * 自定义属性View-Model
 * */
function customerAttrViewModel() {
    this.regions = ko.observableArray();
    this.parseEngines = ko.observableArray(['jsoup', 'xpath']);
    /*添加解析域*/
    this.addItem = function () {
        this.regions.push(new singleCustomerViewModel());
    }.bind(this);
    //删除元素 .bind(this)改变作用域,始终绑定当前对象
    this.removeItem = function (item) {
        this.regions.remove(item);
    }.bind(this);
    this.getAllItems = function () {
    }.bind(this);
}

/**
 *
 * 分页属性View-Model
 * */
function paginationViewModel() {
    this.parseEngine = ko.observableArray(['jsoup', 'xpath']);
    this.selector = ko.observable();
    this.otherSelector = ko.observable();
    this.selectorAttr = ko.observableArray(['href', 'text', 'src', 'html', '其他']);
    this.selectorAttrSelected = ko.observable('href');
    this.filter = ko.observable();
    this.filterCategory = ko.observableArray(['匹配', '替换', '移除']);
    this.filterCategorySelected = ko.observable('匹配');
    this.formatter = ko.observable();
    this.formatCategory = ko.observableArray([]);
    this.paginationType = ko.observableArray(['分页的末尾页数', '分页步进数', '获取分页的记录数', '自定义分页']);
    this.paginationTypeSelected = ko.observable('分页的末尾页数');
    this.paginationUrl = ko.observable();
    this.currentString = ko.observable();
    this.replaceTo = ko.observable();
    this.filterReplaceTo = ko.observable();
    this.start = ko.observable();
    this.records = ko.observable();
    this.interval = ko.observable();
    this.lastNumber = ko.observable();
    this.showStart = ko.computed(function () {
        if (this.paginationTypeSelected() == '分页的末尾页数' || this.paginationTypeSelected() == '获取分页的记录数' || this.paginationTypeSelected() == '自定义分页') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showInterval = ko.computed(function () {
        if (this.paginationTypeSelected() == '分页步进数' || this.paginationTypeSelected() == '自定义分页') {
            //进步数默认值
            if (this.paginationTypeSelected() == '分页步进数') {
                this.interval(2);
            } else if (this.paginationTypeSelected() == '自定义分页') {
                this.interval(1);
            }
            return true;
        } else {
            return false;
        }
    }, this);
    this.showRecords = ko.computed(function () {
        if (this.paginationTypeSelected() == '获取分页的记录数') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showLastNumber = ko.computed(function () {
        if (this.paginationTypeSelected() == '自定义分页') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showSelector = ko.computed(function () {
        if (this.paginationTypeSelected() == '自定义分页') {
            return false;
        } else {
            return true;
        }
    }, this);
    this.showFilter = ko.computed(function () {
        if (this.paginationTypeSelected() == '自定义分页') {
            return false;
        } else {
            return true;
        }
    }, this);
    this.showMatchFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '匹配') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showRemoveFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '移除') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showReplaceFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '替换') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showOtherSelectorInput = ko.computed(function () {
        if (this.selectorAttrSelected() == '其他') {
            this.otherSelector('');
            return true;
        } else {
            return false;
        }
    }, this);
}

/**
 *
 * 通用属性View-Model
 * */
function commonAttrViewMode() {
    this.parseEngine = ko.observableArray(['jsoup', 'xpath']);
    this.selector = ko.observable();
    this.otherSelector = ko.observable();
    this.selectorAttr = ko.observable(['href', 'text', 'src', 'html', '其他']);
    this.selectorAttrSelected = ko.observable('text');
    this.filter = ko.observable();
    this.filterCategory = ko.observable([ '匹配', '替换', '移除']);
    this.filterCategorySelected = ko.observable('匹配');
    this.formatter = ko.observable();
    this.formatCategory = ko.observable(['日期']);
    this.formatCategorySelected = ko.observable('日期');
    this.showMatchFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '匹配') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showRemoveFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '移除') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.showReplaceFilter = ko.computed(function () {
        if (this.filterCategorySelected() == '替换') {
            return true;
        } else {
            return false;
        }
    }, this);
    this.filterReplaceTo = ko.observable();
    this.showOtherSelectorInput = ko.computed(function () {
        if (this.selectorAttrSelected() == '其他') {
            return true;
        } else {
            this.otherSelector('');
            return false;
        }
    }, this);
}
/**************View-Models****************/

/*********************************************Functions**********************************/
$(function () {
    //解决多个View-Model的嵌套问题
    ko.bindingHandlers.stopBinding = {
        init: function () {
            return { controlsDescendantBindings: true };
        }
    };

    var templateGuid = getUrlParameter("templateGuid");
    //执行的是update操作
    if (templateGuid != undefined && templateGuid != '' && templateGuid != null) {
        $.ajax2({
            url: virtualWebPath + '/webapi/crawlToolService/updateTemplate',
            type: 'POST',
            data: {
                templateGuid: templateGuid
            },
            success: function (data) {
                var json =data; // JSON.parse(result);
                if (json.success) {
                    loadPageContext(json.data);
                } else {
                    loadPageContext(null);
                }
            },
            error: function (error) {
            }
        });
    } else {//添加操作页面初始化
        loadPageContext(null);
    }


    //模态对话框事件
    registerModalViewContentEvent();

    //$('#modal_showErrorMessage').on('hidden.bs.modal', function (e) {
    // $('#modal_body_showError').html('');//清空错误信息
    //});
});

/**
 *
 * 页面内容初始化
 * @param {Object} initData 模板结果的JSON对象
 * */
function loadPageContext(initData) {
    $('#news_tab').load('template-news.html', function () {
        $('#schedule_tab').load('template-schedule.html', function () {
            $('#list_tab').load('template-list.html', function () {
                $('#templateTag_tab').load('template-tags.html', function () {
                    //master view model with instances of both the view models.
                    var masterVM = (function () {
                        this.basicInfoViewModel = new basicInfoViewModel();
                        this.scheduleDispatchViewModel = new scheduleDispatchViewModel();
                        this.templateTagsViewModel = new templateTagsViewModel();
                        this.templateIncreaseViewModel = new templateIncreaseViewModel();

                        this.newsCustomerAttrViewModel = new customerAttrViewModel();
                        this.newsTitleViewModel = new commonAttrViewMode();
                        this.newsPublishTimeViewModel = new commonAttrViewMode();
                        this.newsSourceViewModel = new commonAttrViewMode();
                        this.newsContentViewModel = new commonAttrViewMode();

                        this.listCustomerAttrViewModel = new customerAttrViewModel();
                        this.listOutLinkViewModel = new commonAttrViewMode();
                        this.listPaginationViewModel = new paginationViewModel();

                        if (initData != null) {
                            updateTemplate(initData, this);
                        } else {
                            addNewTemplateDataInit(this);
                            //测试 添加模板
                            //testAddNewTemplate(this);
                        }

                        //内容页自定义属性
                        this.newsAttrModels = function () {
                            var attrModels = [];
                            var modelArray = this.newsCustomerAttrViewModel.regions();
                            for (var i = 0; i < modelArray.length; i++) {
                                var model = modelArray[i];
                                var temp = new customerAttrModel(
                                    model.target(), model.selector(), model.attrSelected(), model.otherSelector(), model.filter(), model.filterCategorySelected(), model.formatCategorySelected(), model.formatter(), model.filterReplaceTo()
                                );
                                attrModels.push(temp);
                            }
                            return attrModels;
                        };

                        //列表页自定义属性
                        this.listAttrModels = function () {
                            var attrModels = [];
                            var modelArray = this.listCustomerAttrViewModel.regions();
                            for (var i = 0; i < modelArray.length; i++) {
                                var model = modelArray[i];
                                var temp = new customerAttrModel(
                                    model.target(), model.selector(), model.attrSelected(), model.otherSelector(), model.filter(), model.filterCategorySelected(), model.formatCategorySelected(), model.formatter(), model.filterReplaceTo()
                                );
                                attrModels.push(temp);
                            }
                            return attrModels;
                        };

                        //模板静态属性列表
                        this.templateTagModels = function () {
                            var attrModels = [];
                            var modelArray = this.templateTagsViewModel.tags();
                            for (var i = 0; i < modelArray.length; i++) {
                                var model = modelArray[i];
                                var temp = new templateTagModel(model.tagKey(), model.tagValue());
                                attrModels.push(temp);
                            }
                            return attrModels;
                        };

                        //验证内容页
                        this.verifyNewContent = function () {
                            $('#lbl_result_title').text('内容页验证结果');
                            $('#txt_testResult').val('程序正在执行,请稍后...').css({color: 'red', fontSize: '20px'});
                            ajaxLoadingPostRequest(virtualWebPath + '/webapi/crawlToolService/verifyNewContent', this, showResultInTextArea, showErrorsInTextArea);
                        };

                        //验证列表页
                        this.verifyListContent = function () {
                            $('#lbl_result_title').text('列表页验证结果');
                            $('#txt_testResult').val('程序正在执行,请稍后...').css({color: 'red', fontSize: '20px'});
                            ajaxLoadingPostRequest(virtualWebPath + '/webapi/crawlToolService/verifyListContent', this, showResultInTextArea, showErrorsInTextArea);
                        };

                        /*查看模板JSON*/
                        this.templateTest = function () {
                            $('#lbl_result_title').text('查看模板JSON');
                            $('#txt_testResult').val('程序正在执行,请稍后...').css({color: 'red'});
                            ajaxLoadingPostRequest(virtualWebPath + '/webapi/crawlToolService/getJSONString', this, showResultInTextArea, showErrorsInTextArea);
                        }.bind(this);

                        /*保存模板配置*/
                        this.saveTemplate = function () {
                        	var isHave = true;
                            $("input[name^='attributeName']").each(function(i, o){
							    if($(o).val() == "" || $(o).val() == "undifine") {
							    	alert("自定义属性名称标识为必填项，请检查");
							    	isHave = false;
							    	return false;
							    }
                            });
                            if(isHave) {
                            	$('#modalHtmlTitle').text('保存结果');
                                $('#modal-viewHtml').modal('show');
                                ajaxPostRequest(virtualWebPath + '/webapi/crawlToolService/saveTemplate', this, showResultInModal, showResultInModal);
                            }
                        }.bind(this);

                        /*保存增量模板*/
                        this.saveIncreaseTemplate = function () {
                            $('#modalHtmlTitle').text('保存结果');
                            $('#modal-viewHtml').modal('show');
                            ajaxPostRequest(virtualWebPath + '/webapi/crawlToolService/saveIncreaseTemplate', this, showResultInModal, showResultInModal);
                        }.bind(this);

                        /*保存到本地文件*/
                        this.saveToLocalFile = function () {
                            $('#modalHtmlTitle').text('保存结果');
                            $('#modal-viewHtml').modal('show');
                            ajaxPostRequest(virtualWebPath + '/webapi/crawlToolService/saveToLocalFile', this, showResultInModal, showResultInModal);
                        }.bind(this);

                        /*批量生成搜索引擎模板*/
                        this.bulkSearchTemplates = function () {
                            var infoTitle = '生成搜索引擎模板结果';
                            var infoErrorMsg = '批量生成生成搜索引擎模板失败！';
                            ajax2PostRequest(virtualWebPath + '/webapi/crawlToolService/bulkSearchTemplates', this, infoTitle, infoErrorMsg);
                        }.bind(this);

                        /*根据模板类型显示相应按钮*/
                        this.showNormalTemplateBtn = ko.computed(function () {
                            if (this.basicInfoViewModel.templateTypesSelected() == "普通模板") {
                                return true;
                            } else {
                                return false;
                            }
                        }, this);
                        /*根据模板类型显示相应按钮*/
                        this.showSearchTemplateBtn = ko.computed(function () {
                            if (this.basicInfoViewModel.templateTypesSelected() == "普通模板") {
                                return false;
                            } else {
                                return true;
                            }
                        }, this);
                    })();
                    ko.applyBindings(masterVM);
                });
            })
        });
    });
}

/**
 *
 *添加模板 数据初始化
 *@param {Object} pageViewModel 当前页面的View-Model
 * */
function addNewTemplateDataInit(pageViewModel) {
    pageViewModel.newsTitleViewModel.selectorAttrSelected('text');
    pageViewModel.newsPublishTimeViewModel.selectorAttrSelected('text');
    pageViewModel.newsContentViewModel.selectorAttrSelected('text');
    pageViewModel.listOutLinkViewModel.selectorAttrSelected('href');
    pageViewModel.listPaginationViewModel.selectorAttrSelected('text');
    pageViewModel.listPaginationViewModel.currentString('##');
    pageViewModel.listPaginationViewModel.start('2');

    //调度配置初始值
    pageViewModel.scheduleDispatchViewModel.sequence('1');
    pageViewModel.templateIncreaseViewModel.pageCounts('2');

    //模板静态属性预置
    var projectTagViewModel = new singleTemplateTagViewModel();
    projectTagViewModel.tagKey('项目');
    pageViewModel.templateTagsViewModel.tags.push(projectTagViewModel);
    var categoryTagViewModel = new singleTemplateTagViewModel();
    categoryTagViewModel.tagKey('分类');
    pageViewModel.templateTagsViewModel.tags.push(categoryTagViewModel);
    var mediaTypeTagViewModel = new singleTemplateTagViewModel();
    mediaTypeTagViewModel.tagKey('mediaType');
    pageViewModel.templateTagsViewModel.tags.push(mediaTypeTagViewModel);
    var subMediaTypeTagViewModel = new singleTemplateTagViewModel();
    subMediaTypeTagViewModel.tagKey('subMediaType');
    pageViewModel.templateTagsViewModel.tags.push(subMediaTypeTagViewModel);
    var languageTagViewModel = new singleTemplateTagViewModel();
    languageTagViewModel.tagKey('language');
    pageViewModel.templateTagsViewModel.tags.push(languageTagViewModel);
    var isOverseaTagViewModel = new singleTemplateTagViewModel();
    isOverseaTagViewModel.tagKey('isOversea');
    pageViewModel.templateTagsViewModel.tags.push(isOverseaTagViewModel);
    var dataSourceTagViewModel = new singleTemplateTagViewModel();
    dataSourceTagViewModel.tagKey('dataSource');
    pageViewModel.templateTagsViewModel.tags.push(dataSourceTagViewModel);
}

/**
 *
 *[测试] 添加模板
 *@param {Object} pageViewModel 当前页面的View-Model
 * */
function testAddNewTemplate(pageViewModel) {
    //基本信息测试
    pageViewModel.basicInfoViewModel.url('http://www.drcnet.com.cn/www/Integrated/Leaf.aspx?uid=040401&version=integrated&chnid=1017&leafid=3018');
    pageViewModel.basicInfoViewModel.name('国研网-银行信托');

    //调度参数测试test
    pageViewModel.scheduleDispatchViewModel.sequence('3');

    //新闻内容标题test
    pageViewModel.newsTitleViewModel.selector('#docSubject');

    //新闻内容时间test
    pageViewModel.newsPublishTimeViewModel.selector('#docDeliveddate');

    //新闻内容test
    pageViewModel.newsContentViewModel.selector('#docSummary');

    //列表页链接test
    pageViewModel.listOutLinkViewModel.selector('#Content_WebPageDocumentsByUId1 > li > div.sub > a');
    pageViewModel.listPaginationViewModel.filter('\\d+');

    //分页test
    pageViewModel.listPaginationViewModel.paginationUrl('http://www.drcnet.com.cn/www/Integrated/Leaf.aspx?uid=040401&version=integrated&chnid=1017&leafid=3018&curpage=##');
    pageViewModel.listPaginationViewModel.selector('#Content_WebPageDocumentsByUId1_span_totalpage');
}

/**
 *
 * 模板修改
 * @param {Object} initData 页面初始化数据对象
 * @param {Object} pageViewModel 当前页面的View-Model
 * */
function updateTemplate(initData, pageViewModel) {
    var templateGuid = initData.templateGuid;
    $.ajax({
        url: virtualWebPath + '/webapi/crawlToolService/getSingleTemplateModel',
        type: 'POST',
        data: {
            templateGuid: templateGuid
        },
        success: function (data) {
            var json =data; // JSON.parse(result);
            updateTemplateDataInit(initData, pageViewModel, json.data);
        },
        error: function (error) {
        }
    });
}

/**
 *
 * 模板修改 数据初始化
 * @param {Object} initData 页面初始化数据对象
 * @param {Object} pageViewModel 当前页面的View-Model
 * @param {String}　singleTemplateListJSON　单个模板对象的JSON字符
 * */
function updateTemplateDataInit(initData, pageViewModel, singleTemplateListJSON) {
    var templateModel = null;
    if (singleTemplateListJSON != '' && singleTemplateListJSON != undefined && singleTemplateListJSON != null) {
        templateModel = JSON.parse(singleTemplateListJSON);
    }
    //基本信息、调度配置信息、增量配置信息
    if (templateModel != null) {
        //页面标题
        var templateName = templateModel.basicInfoViewModel.name;
        $('title').text(templateName);
        $('#title_config').text(templateName);
        pageViewModel.basicInfoViewModel.name(templateName);
        pageViewModel.basicInfoViewModel.url(templateModel.basicInfoViewModel.url);
        pageViewModel.basicInfoViewModel.currentString(templateModel.basicInfoViewModel.currentString);
        pageViewModel.basicInfoViewModel.templateTypesSelected(templateModel.basicInfoViewModel.templateType);
        //调度配置信息
        pageViewModel.scheduleDispatchViewModel.periodsSelected(templateModel.scheduleDispatchViewModel.period);
        pageViewModel.scheduleDispatchViewModel.sequence(templateModel.scheduleDispatchViewModel.sequence);
        pageViewModel.scheduleDispatchViewModel.useProxy(templateModel.scheduleDispatchViewModel.useProxy);
        //增量配置信息
        pageViewModel.templateIncreaseViewModel.periodsSelected(templateModel.templateIncreaseViewModel.period);
        pageViewModel.templateIncreaseViewModel.pageCounts(templateModel.templateIncreaseViewModel.pageCounts);
        pageViewModel.templateIncreaseViewModel.pageSortSelected(templateModel.templateIncreaseViewModel.pageSort);
    }

    //列表页外链接
    var listOutLinkArray = initData.list;
    if (listOutLinkArray != null && listOutLinkArray.length > 0) {
        var listOutLink = listOutLinkArray[0];
        if (listOutLink.indexers != null) {
            var listOutLinkIndexer = listOutLink.indexers[0];
            var listOutLinkSelector = listOutLinkIndexer.value;
            var listOutLinkSelectorAttr = listOutLinkIndexer.attribute;
            pageViewModel.listOutLinkViewModel.selector(listOutLinkSelector);
            if (listOutLinkSelectorAttr != 'href' && listOutLinkSelectorAttr != 'text' && listOutLinkSelectorAttr != 'src' && listOutLinkSelectorAttr != 'html') {
                pageViewModel.listOutLinkViewModel.selectorAttrSelected('其他');
                pageViewModel.listOutLinkViewModel.otherSelector(listOutLinkSelectorAttr);
            } else {
                pageViewModel.listOutLinkViewModel.selectorAttrSelected(listOutLinkSelectorAttr);
            }
        }

        //列表页的自定义属性
        var listOutLinkLabels = listOutLink.labels;
        if (listOutLinkLabels != null) {
            for (var i = 0; i < listOutLinkLabels.length; i++) {
                var listCustomerAttrObj = listOutLinkLabels[i];
                var customerViewModel = new singleCustomerViewModel();
                //自定义属性索引器
                if (listCustomerAttrObj.indexers != null) {
                    var customerViewModelIndexer = listCustomerAttrObj.indexers[0];
                    customerViewModel.target(listCustomerAttrObj.name);
                    customerViewModel.selector(customerViewModelIndexer.value);
                    if (customerViewModelIndexer.attribute != 'href' && customerViewModelIndexer.attribute != 'text' && customerViewModelIndexer.attribute != 'src' && customerViewModelIndexer.attribute != 'html') {
                        customerViewModel.otherSelector(customerViewModelIndexer.attribute);
                        customerViewModel.attrSelected('其他');
                    } else {
                        customerViewModel.attrSelected(customerViewModelIndexer.attribute);
                    }
                }

                //列表自定义属性过滤器
                if (listCustomerAttrObj.filters != null) {
                    var customerViewModelFilter = listCustomerAttrObj.filters[0];
                    setViewModelFilter(customerViewModel, customerViewModelFilter);
                }

                //列表自定义属性格式化器
                if (listCustomerAttrObj.formats != null) {
                    var customerViewModelFormatter = listCustomerAttrObj.formats[0];
                    setViewModelFormatter(customerViewModel, customerViewModelFormatter);
                }

                pageViewModel.listCustomerAttrViewModel.regions.push(customerViewModel);
            }
        }
    }

    //列表分页
    var listPaginationArray = initData.pagination;
    if (listPaginationArray != null && listPaginationArray.length > 0) {
        var listPagination = listPaginationArray[0];
        //分页索引器
        if (listPagination.indexers != null) {
            var listPaginationIndexer = listPagination.indexers[0];
            var listPaginationSelector = listPaginationIndexer.value;
            var listPaginationSelectorAttr = listPaginationIndexer.attribute;
            pageViewModel.listPaginationViewModel.selector(listPaginationSelector);
            if (listPaginationSelectorAttr != 'href' && listPaginationSelectorAttr != 'text' && listPaginationSelectorAttr != 'src' && listPaginationSelectorAttr != 'html') {
                pageViewModel.listPaginationViewModel.selectorAttrSelected('其他');
                pageViewModel.listPaginationViewModel.otherSelector(listPaginationSelectorAttr);
            } else {
                pageViewModel.listPaginationViewModel.selectorAttrSelected(listPaginationSelectorAttr);
            }
        }
        //过滤器
        if (listPagination.filters != null) {
            var listPaginationFilter = listPagination.filters[0];
            var listPaginationFilterCategory = listPaginationFilter.type;
            if (listPaginationFilterCategory == "match") {
                pageViewModel.listPaginationViewModel.filterCategorySelected('匹配');
                pageViewModel.listPaginationViewModel.filter(listPaginationFilter.value);
            }
            if (listPaginationFilterCategory == "remove") {
                pageViewModel.listPaginationViewModel.filterCategorySelected('移除');
                pageViewModel.listPaginationViewModel.filter(listPaginationFilter.value);
            }
            if (listPaginationFilterCategory == "replace") {
                pageViewModel.listPaginationViewModel.filterCategorySelected('替换');
                pageViewModel.listPaginationViewModel.filter(listPaginationFilter.value);
                pageViewModel.listPaginationViewModel.filterReplaceTo(listPaginationFilter.replaceTo);
            }

        }
        pageViewModel.listPaginationViewModel.paginationUrl(listPagination.pagitationUrl);
        var paginationType = listPagination.pagitationType;
        if (paginationType == "number") {//分页的末尾页数
            pageViewModel.listPaginationViewModel.paginationTypeSelected('分页的末尾页数');
        } else if (paginationType == "interval") {//分页步进数
            pageViewModel.listPaginationViewModel.paginationTypeSelected('分页步进数');
            pageViewModel.listPaginationViewModel.interval(listPagination.interval);
        } else if (paginationType == "record") {//获取分页的记录数
            pageViewModel.listPaginationViewModel.paginationTypeSelected('获取分页的记录数');
            pageViewModel.listPaginationViewModel.records(listPagination.recordNumber);
        } else if (paginationType == "page") {//获取分页URL
            pageViewModel.listPaginationViewModel.paginationTypeSelected('获取分页URL');
        } else if (paginationType == "custom") {//自定义分页
            pageViewModel.listPaginationViewModel.paginationTypeSelected('自定义分页');
            pageViewModel.listPaginationViewModel.interval(listPagination.interval);
            pageViewModel.listPaginationViewModel.lastNumber(listPagination.lastNumber);
        }
        pageViewModel.listPaginationViewModel.currentString(listPagination.current);
        pageViewModel.listPaginationViewModel.replaceTo(listPagination.replaceTo);
        pageViewModel.listPaginationViewModel.start(listPagination.startNumber);
    }

    //内容页 标题
    var newsArray = initData.news;
    if (newsArray != null) {
        for (var i = 0; i < newsArray.length; i++) {
            var newsField = newsArray[i];
            var newsFieldName = newsField.name;
            if (newsField.indexers == null) {
                continue;
            }
            var newsFieldIndexer = newsField.indexers[0];
            if (newsFieldName == "title") {
                pageViewModel.newsTitleViewModel.selector(newsFieldIndexer.value);
                var newsSelectorAttr = newsFieldIndexer.attribute;
                if (newsSelectorAttr != 'href' && newsSelectorAttr != 'text' && newsSelectorAttr != 'src' && newsSelectorAttr != 'html') {
                    pageViewModel.newsTitleViewModel.selectorAttrSelected('其他');
                    pageViewModel.newsTitleViewModel.otherSelector(newsSelectorAttr);
                } else {
                    pageViewModel.newsTitleViewModel.selectorAttrSelected(newsSelectorAttr);
                }
                if (newsField.filters != null) {
                    var newsTitleViewModelFilter = newsField.filters[0];
                    setViewModelFilter(pageViewModel.newsTitleViewModel, newsTitleViewModelFilter);
                }
            } else if (newsFieldName == "content") {
                pageViewModel.newsContentViewModel.selector(newsFieldIndexer.value);
                var newsSelectorAttr = newsFieldIndexer.attribute;
                if (newsSelectorAttr != 'href' && newsSelectorAttr != 'text' && newsSelectorAttr != 'src' && newsSelectorAttr != 'html') {
                    pageViewModel.newsContentViewModel.selectorAttrSelected('其他');
                    pageViewModel.newsContentViewModel.otherSelector(newsSelectorAttr);
                } else {
                    pageViewModel.newsContentViewModel.selectorAttrSelected(newsSelectorAttr);
                }
                if (newsField.filters != null) {
                    var newsContentViewModelFilter = newsField.filters[0];
                    setViewModelFilter(pageViewModel.newsContentViewModel, newsContentViewModelFilter);
                }
            } else if (newsFieldName == "tstamp") {
                pageViewModel.newsPublishTimeViewModel.selector(newsFieldIndexer.value);
                var newsSelectorAttr = newsFieldIndexer.attribute;
                if (newsSelectorAttr != 'href' && newsSelectorAttr != 'text' && newsSelectorAttr != 'src' && newsSelectorAttr != 'html') {
                    pageViewModel.newsPublishTimeViewModel.selectorAttrSelected('其他');
                    pageViewModel.newsPublishTimeViewModel.otherSelector(newsSelectorAttr);
                } else {
                    pageViewModel.newsPublishTimeViewModel.selectorAttrSelected(newsSelectorAttr);
                }
                if (newsField.filters != null) {
                    var newsPublishTimeViewModelFilter = newsField.filters[0];
                    setViewModelFilter(pageViewModel.newsPublishTimeViewModel, newsPublishTimeViewModelFilter);
                }
                if (newsField.formats != null) {
                    var newsPublishTimeViewModelFormatter = newsField.formats[0];
                    setViewModelFormatter(pageViewModel.newsPublishTimeViewModel, newsPublishTimeViewModelFormatter);
                }
            } else if (newsFieldName == "source") {
                pageViewModel.newsSourceViewModel.selector(newsFieldIndexer.value);
                var newsSelectorAttr = newsFieldIndexer.attribute;
                if (newsSelectorAttr != 'href' && newsSelectorAttr != 'text' && newsSelectorAttr != 'src' && newsSelectorAttr != 'html') {
                    pageViewModel.newsSourceViewModel.selectorAttrSelected('其他');
                    pageViewModel.newsSourceViewModel.otherSelector(newsSelectorAttr);
                } else {
                    pageViewModel.newsSourceViewModel.selectorAttrSelected(newsSelectorAttr);
                }
                if (newsField.filters != null) {
                    var newsSourceViewModelFilter = newsField.filters[0];
                    setViewModelFilter(pageViewModel.newsSourceViewModel, newsSourceViewModelFilter);
                }
            } else {
                //内容页的自定义属性
                var customerViewModel = new singleCustomerViewModel();
                //自定义属性索引器
                customerViewModel.target(newsField.name);
                customerViewModel.selector(newsFieldIndexer.value);
                if (newsFieldIndexer.attribute != 'href' && newsFieldIndexer.attribute != 'text' && newsFieldIndexer.attribute != 'src' && newsFieldIndexer.attribute != 'html') {
                    customerViewModel.attrSelected('其他');
                    customerViewModel.otherSelector(newsFieldIndexer.attribute);
                } else {
                    customerViewModel.attrSelected(newsFieldIndexer.attribute);
                }

                //内容页自定义属性过滤器
                if (newsField.filters != null) {
                    var customerViewModelFilter = newsField.filters[0];
                    setViewModelFilter(customerViewModel, customerViewModelFilter);
                }

                //内容页自定义属性格式化器
                if (newsField.formats != null) {
                    var customerViewModelFormatter = newsField.formats[0];
                    setViewModelFormatter(customerViewModel, customerViewModelFormatter);
                }

                pageViewModel.newsCustomerAttrViewModel.regions.push(customerViewModel);
            }
        }
    }

    //模板的静态属性tag
    var templateTags = initData.tags;
    if (templateTags != null) {
        //缺少相关属性时，则自动预置
        initUpdateTemplateTags(templateTags);
        var projectTagField = new singleTemplateTagViewModel();
        //优先项目和分类
        if (templateTags['项目'] != null && templateTags['项目'] != undefined) {
            projectTagField.tagKey('项目');
            projectTagField.tagValue(templateTags['项目']);
            pageViewModel.templateTagsViewModel.tags.push(projectTagField);
        }

        var categoryTagField = new singleTemplateTagViewModel();
        if (templateTags['分类'] != null && templateTags['分类'] != undefined) {
            categoryTagField.tagKey('分类');
            categoryTagField.tagValue(templateTags['分类']);
            pageViewModel.templateTagsViewModel.tags.push(categoryTagField);
        }

        for (var tagKey in templateTags) {
            var tagValue = templateTags[tagKey];
            var templateTagModel = new singleTemplateTagViewModel();
            if (tagKey == '项目' || tagKey == '分类') {
                continue;
            }
            templateTagModel.tagKey(tagKey);
            templateTagModel.tagValue(tagValue);
            pageViewModel.templateTagsViewModel.tags.push(templateTagModel);
        }
    }
}

/**
 *
 * 如果修改时，模板中缺少静态属性，则自动预置
 * @param {Array} templateTags 静态属性
 * */
function initUpdateTemplateTags(templateTags) {
    var isMediaType = false;
    var isSubMediaType = false;
    var isLanguage = false;
    var isOversea = false;
    var isDataSource = false;
    var isProject = false;
    var isCategory = false;
    for (var tagKey in templateTags) {
        if (tagKey == 'mediaType') {
            isMediaType = true;
        } else if (tagKey == 'subMediaType') {
            isSubMediaType = true;
        } else if (tagKey == 'language') {
            isLanguage = true;
        } else if (tagKey == 'isOversea') {
            isOversea = true;
        } else if (tagKey == 'dataSource') {
            isDataSource = true;
        } else if (tagKey == '项目') {
            isProject = true;
        } else if (tagKey == '分类') {
            isCategory = true;
        }
    }

    if (!isProject) {
        templateTags.项目 = '';
    }
    if (!isCategory) {
        templateTags.分类 = '';
    }
    if (!isMediaType) {
        templateTags.mediaType = '';
    }
    if (!isSubMediaType) {
        templateTags.subMediaType = '';
    }
    if (!isLanguage) {
        templateTags.language = '';
    }
    if (!isOversea) {
        templateTags.isOversea = '';
    }
    if (!isDataSource) {
        templateTags.dataSource = '';
    }
}

/**
 *
 * 设置View-Model的过滤器
 * @param {Object} viewModel view-model 对象
 * @param {Object} viewModelFilter viewModel的过滤器
 * */
function setViewModelFilter(viewModel, viewModelFilter) {
    var filterCategory = viewModelFilter.type;
    if (filterCategory == "match") {
        viewModel.filterCategorySelected('匹配');
        viewModel.filter(viewModelFilter.value);
    }
    if (filterCategory == "remove") {
        viewModel.filterCategorySelected('移除');
        viewModel.filter(viewModelFilter.value);
    }
    if (filterCategory == "replace") {
        viewModel.filterCategorySelected('替换');
        viewModel.filter(viewModelFilter.value);
        viewModel.filterReplaceTo(viewModelFilter.replaceTo);
    }
}

/**
 *
 * 设置View-Model的格式化器
 * @param {Object} viewModel view-model 对象
 * @param {Object} viewModelFormatter viewModel的格式化器
 * */
function setViewModelFormatter(viewModel, viewModelFormatter) {
    var formatterCategory = viewModelFormatter.type;
    if (formatterCategory == "date") {
        viewModel.formatCategorySelected('日期');
        viewModel.formatter(viewModelFormatter.value);
    }
}

/**
 *
 * 在textArea 中显示请求的结果
 * */
function showResultInTextArea(data) {
    //$('#modal_body_showError').html('');
    //$('#btn_showErrorMessage').hide();
    var result =data; // JSON.parse(result);
    if (result.success) {
        $('#txt_testResult').val(JSON.stringify(result.data, null, 4)).css({color: '#000000', fontSize: '14px'});
    } else {
        $('#txt_testResult').val(result.errorMsg).css({color: '#000000', fontSize: '14px'});
    }
}

/**
 *
 * 在textArea中显示请求的错误信息
 * */
function showErrorsInTextArea(error) {
    $('#txt_testResult').val("错误信息:" + error.responseText).css({color: '#000000', fontSize: '14px'});
    //$('#modal_body_showError').html(error.responseText);
    //$('#btn_showErrorMessage').show();
}

/**
 *
 * 在模式对话框中显示结果
 * */
function showResultInModal(data) {
    var modalBody = $('#modal-viewHtml-body');
    modalBody.text('');//清空
    if (data.responseText) {
        modalBody.text("错误信息:" + data.responseText);
    } else {
        var result =data; // JSON.parse(result);
        if (result.success) {
            modalBody.text(result.data);
        } else {
            modalBody.text(result.errorMsg);
        }
    }
}

/**
 *
 * 在模式对话框中显示结果
 * */
function showResultInModalWithHtml(data) {
    var modalBody = $('#modal-viewHtml-body');
    modalBody.html('');//清空
    if (data.responseText) {
        modalBody.text("错误信息:" + data.responseText);
    } else {
        var result =data; // JSON.parse(result);
        if (result.success) {
            modalBody.html(result.data);
        } else {
            modalBody.text(result.errorMsg);
        }
    }
}

/**
 *
 * ajax post 请求
 * @param {String} url
 * @param {Object} data
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * */
function ajaxLoadingPostRequest(url, data, successCallback, errorCallback) {
    $.ajax2({
        url: url,
        type: 'POST',
        data: {
            data: getJSONString(data)
        },
        success: function (data) {
            successCallback(data)
        },
        error: function (error) {
            errorCallback(error)
        }
    }, '#test_validate_result');
}

/**
 *
 * ajax post 请求
 * @param {String} url 资源URL
 * @param {Object} data POST数据
 * @param {String} title 提示标题
 * @param {String} errMsg 错误信息
 * */
function ajax2PostRequest(url, data, title, errMsg) {
    var htmlModal = $('#modal-viewHtml');
    $('#modalHtmlTitle').text(title);
    var modalBody = $('#modal-viewHtml-body');
    $.ajax2({
        url: url,
        type: 'POST',
        data: {
            data: getJSONString(data)
        },
        success: function (data) {
            var json =data; // JSON.parse(result);
            modalBody.html(json.data);
            htmlModal.modal('show');
        },
        error: function (error) {
            modalBody.text("操作信息", "&nbsp;&nbsp;&nbsp;&nbsp;" + errMsg + "<br/> 错误信息：<br/>" + data.responseText);
            htmlModal.modal('show');
        }
    });
}

/**
 *
 * ajax post 请求
 * @param {String} url
 * @param {Object} data
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * */
function ajaxPostRequest(url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            data: getJSONString(data)
        },
        success: function (data) {
            successCallback(data)
        },
        error: function (error) {
            errorCallback(error)
        }
    });
}

/**
 *
 * @param {Object} obj=masterVM
 * */
function getJSONString(obj) {
    var jsonString = JSON.stringify({
        basicInfoViewModel: {
            url: obj.basicInfoViewModel.url(),
            name: obj.basicInfoViewModel.name(),
            tag: obj.basicInfoViewModel.tagsSelected(),
            templateType: obj.basicInfoViewModel.templateTypesSelected(),
            currentString: obj.basicInfoViewModel.currentString()
        },
        newsCustomerAttrViewModel: obj.newsAttrModels(),
        newsTitleViewModel: {
            selector: obj.newsTitleViewModel.selector(),
            selectorAttr: obj.newsTitleViewModel.selectorAttrSelected(),
            otherSelector: obj.newsTitleViewModel.otherSelector(),
            filterCategory: obj.newsTitleViewModel.filterCategorySelected(),
            filter: obj.newsTitleViewModel.filter(),
            filterReplaceTo: obj.newsTitleViewModel.filterReplaceTo()
        },
        newsPublishTimeViewModel: {
            selector: obj.newsPublishTimeViewModel.selector(),
            selectorAttr: obj.newsPublishTimeViewModel.selectorAttrSelected(),
            otherSelector: obj.newsPublishTimeViewModel.otherSelector(),
            filterCategory: obj.newsPublishTimeViewModel.filterCategorySelected(),
            filter: obj.newsPublishTimeViewModel.filter(),
            filterReplaceTo: obj.newsPublishTimeViewModel.filterReplaceTo(),
            formatter: obj.newsPublishTimeViewModel.formatter(),
            formatCategory: obj.newsPublishTimeViewModel.formatCategorySelected()
        },
        newsSourceViewModel: {
            selector: obj.newsSourceViewModel.selector(),
            selectorAttr: obj.newsSourceViewModel.selectorAttrSelected(),
            otherSelector: obj.newsSourceViewModel.otherSelector(),
            filterCategory: obj.newsSourceViewModel.filterCategorySelected(),
            filter: obj.newsSourceViewModel.filter(),
            filterReplaceTo: obj.newsSourceViewModel.filterReplaceTo()
        },
        newsContentViewModel: {
            selector: obj.newsContentViewModel.selector(),
            selectorAttr: obj.newsContentViewModel.selectorAttrSelected(),
            otherSelector: obj.newsContentViewModel.otherSelector(),
            filterCategory: obj.newsContentViewModel.filterCategorySelected(),
            filter: obj.newsContentViewModel.filter(),
            filterReplaceTo: obj.newsContentViewModel.filterReplaceTo()
        },
        listCustomerAttrViewModel: obj.listAttrModels(),
        listOutLinkViewModel: {
            selector: obj.listOutLinkViewModel.selector(),
            selectorAttr: obj.listOutLinkViewModel.selectorAttrSelected(),
            otherSelector: obj.listOutLinkViewModel.otherSelector()
        },
        listPaginationViewModel: {
            selector: obj.listPaginationViewModel.selector(),
            selectorAttr: obj.listPaginationViewModel.selectorAttrSelected(),
            otherSelector: obj.listPaginationViewModel.otherSelector(),
            filterCategory: obj.listPaginationViewModel.filterCategorySelected(),
            filter: obj.listPaginationViewModel.filter(),
            paginationType: obj.listPaginationViewModel.paginationTypeSelected(),
            paginationUrl: obj.listPaginationViewModel.paginationUrl(),
            currentString: obj.listPaginationViewModel.currentString(),
            replaceTo: obj.listPaginationViewModel.replaceTo(),
            filterReplaceTo: obj.listPaginationViewModel.filterReplaceTo(),
            start: obj.listPaginationViewModel.start(),
            records: obj.listPaginationViewModel.records(),
            interval: obj.listPaginationViewModel.interval(),
            lastNumber: obj.listPaginationViewModel.lastNumber()
        },
        scheduleDispatchViewModel: {
            domain: getDomainByUrl(obj.basicInfoViewModel.url()),
            period: obj.scheduleDispatchViewModel.periodsSelected(),
            sequence: obj.scheduleDispatchViewModel.sequence(),
            useProxy: obj.scheduleDispatchViewModel.useProxy()
        },
        templateTagsViewModel: obj.templateTagModels(),
        templateIncreaseViewModel: {
            period: obj.templateIncreaseViewModel.periodsSelected(),
            pageCounts: obj.templateIncreaseViewModel.pageCounts(),
            pageSort: obj.templateIncreaseViewModel.pageSortSelected()
        }
    });
    return jsonString;
}

/**
 *
 * 根据url获取domain
 * */
function getDomainByUrl(url) {
    var url = $.trim(url);
    if (url.search(/^https?\:\/\//) != -1) {
        url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, "");
    } else {
        url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, "");
    }

    if (url != null) {
        if (url.length > 0) {
            return url[1];
        }
    }

    return "";
}

/**
 *
 * 给模态对话框注册事件
 * */
function registerModalViewContentEvent() {
    $('#modal-viewHtml').on('hidden.bs.modal', function (e) {
        var modalBody = $('#modal-viewHtml-body');
        modalBody.html('');//清空
        modalBody.html('<div class=\"text-center\"><img src=\"../image/load.gif\"></div>');
    })
}

/**
 *
 * 得到URL中的参数
 * */
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

/******重写Ajax操作,做成通用Loading操作*******/
$.ajax2 = function (options, aimDiv) {
    var img = $("<img id=\"progressImgage\"  src=\"../image/load.gif\" />"); //Loading小图标
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