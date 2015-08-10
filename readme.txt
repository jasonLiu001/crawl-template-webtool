调试开发及部署环境要求
    1.eclipse开发及调试环境要求
        1.1 安装wtp环境
            1.1.1 eclipse中安装wtp环境的update地址:http://download.eclipse.org/webtools/repository/luna
            1.1.2 wtp环境配置及安装说明
                        文档1:http://www.vogella.com/tutorials/EclipseWTP/article.html#overview(说明相对完整)
                        文档2:http://dev.antoinesolutions.com/web-tools-platform-wtp
        1.3 安装maven
        1.4 安装Tomcat 6.0以上
        1.5 安装Redis(开发环境依赖本地redis)

    2.部署环境步骤
        2.1 更新爬虫项目代码到最新，并切换到爬虫项目根目录，pom.xml文件所在目录后，执行maven命令：mvn install.
        2.2 更新爬虫模板工具代码到最新，并切换到爬虫项目根目录，pom.xml文件所在目录后，执行命令:mvn clean package. 如果命令行提示窗口中出现"BUILD SUCCESS",则表明编译成功.
        2.3 启动Tomcat,输入http://localhost:8080/crawl-template-webtool/index.html访问,能够访问到界面,说明部署配置成功.

特别说明:    
    1.在开发过程中,每次修改过文件都需要通过命令：mvn clean package 来重新编译，并启动tomcat才能生效!