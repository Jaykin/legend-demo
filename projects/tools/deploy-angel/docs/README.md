### 准备工作

- **本机安装的NodeJS版本必须为6.0.0以上**

- 所有系统的用户
    1. 根据自己电脑上的chrome版本，[下载对应的ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads)
    2. 下载完成后，复制到本地放工具软件的文件夹，解压

- windows用户
    1. chromedriver解压后，会出现一个.exe文件。在电脑的系统变量中配置chromedriver文件夹路径（路径配置到文件夹即可，不需要配置到exe），如图（图中chromedriver为文件夹名称）：
        ![windows_env_path](./docs/imgs/windows_env_path.png)
    2. svn配置。如果在安装svn的时候没有选择下图中的选项，请重装svn。
        ![windows_svn_install_opt](./docs/imgs/windows_svn_install_opt.jpg)

- mac用户
    1. chromedriver解压后，会出现一个unix executable文件，把它拖到（复制到）`/usr/local/bin`下。命令行运行`which chromedriver`，确认已经放到正确路径下
    2. 如果你本身没有安装，`brew install svn` 安装svn命令行
    3. 如果你已经安装过cornerstone，且在`brew install`之后出现问题，请升级至最新的cornerstone版本。（这里有一个：http://soft.macx.cn/3947.htm ）
    4. 如果你在这之前一直在使用的cornerstone版本与刚刚安装的命令行svn版本有差异，可能会遇到一些问题，请参考[这份文档](./docs/mac_svn_faq.md)

### 安装项目依赖

``` bash
npm install
```

### 配置需要部署的项目
在`configs`文件下，新增目标部署项目的config文件，命名规则为：`<projectName>.conf.json`，如：`imofun.conf.json`。

文件内容说明如下，具体例子请参考`imofun.conf.json`：

```json
{
    "dist": "项目源文件中dist文件夹的绝对路径",
    "svn": {
        /*可以配置多个环境*/
        "test": "本地svn仓库中对应环境的文件夹的绝对路径"
    },
    "walle": {
        /*可以配置多个环境*/
        "test": "walle提交上线单页，对应环境的project id（使用开发者工具在dom中查找）"
    }
}
```

![get_walle_project_id](./docs/imgs/get_walle_project_id.png)

可以配置多个项目。不同项目请在不同的`.conf.json`中配置。

### 配置walle登录信息
在`configs`文件下的`walle.auth.json`中配置自己的walle登录信息。

### 部署命令配置

**mac用户，在完成面几个步骤的配置后，请先在本项目的目录下，运行`npm link`**

**windows用户，你们可操控的命令配置在`package.json`的`scripts`下**

默认部署命令为`deploy`。

该命令的选项**按顺序**分为三个部分：`<project>`，`<env>`，和`[repo]`。

其中`<project>`，`<env>`为必须项, `[repo]`（即svn或walle）为optional。

1. project名称必须对应`configs`文件夹中你配置的`.conf.json`名称
2. env名称必须对应`.conf.json`内配置好的环境名称



如果不定义`repo`，会自动更新svn代码并完成walle部署。例如：

```bash
# mac（可以在任何地方执行deploy命令）
deploy imofun test

# windows (只能在本项目下执行npm命令)
# package.json中的scripts配置
# "scripts": {
#   "deploy": "node ./command.js deploy imofun test"
# }
npm run deploy
```

上面这条命令会更新imofun项目svn test文件夹里面的代码，并部署到test环境。

如果定义repo，则只会更新指定的repo。例如：

```bash
# mac
deploy imofun test svn

# windows (package.json中的scripts配置)
# "scripts": {
#   "deploy": "node ./command.js deploy imofun test svn"
# }
npm run deploy
```

上面这条命令只会更新imofun项目svn test文件夹里面的代码。同理，如果只需要部署walle，把上面命令中的`svn`改成`walle`即可。

mac用户可以像其它命令行一样自由地使用`deploy`这个命令，而windows用户则需要在`package.json`的`scripts`中配置好命令。所以建议windows用户预先配置好各种情况：

```json
"scripts": {
  "deploy-imofun-test"   : "node ./command.js deploy imofun test",
  "deploy-imofun-release": "node ./command.js deploy imofun release",
  "deploy-icar-test"     : "node ./command.js deploy icar test",
  "deploy-icar-release"  : "node ./command.js deploy icar release",
  "commit-test-svn"      : "node ./command.js deploy imofun test svn",
  "commit-test-walle"    : "node ./command.js deploy imofun test walle"
}
```

### 我不喜欢命令叫`deploy`，可以叫别的吗？

可以。

- windows用户，在`package.json`的`scripts`中配置

    ``` json
    "scripts": {
      "<你喜欢的命令名称>": "node ./command.js deploy <project> <env> [repo]"
    }
    ```

- mac用户：

    先运行下面的命令删除link

    ```bash
    npm unlink
    ```

    在`package.json`的`bin`中配置

    ``` json
    "bin": {
      "<你喜欢的命令名称>": "./command.js"
    }
    ```

    重新link

    ```bash
    npm link
    ```
