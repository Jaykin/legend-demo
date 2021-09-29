# Nginx

## 概述
>是一个轻量级、高性能的 Web 和反向代理服务器

## 创建环境
* 下载 nginx 稳定版本
* 使用命令行控制 nginx 的启动/关闭
  * cd 至安装目录，运行 `nginx.exe` 可执行文件来启动
  * 检查是否启动成功：浏览器访问 `http://localhost:80` 是否成功
  * 查看进程信息：`tasklist /fi "imagename eq nginx.exe`
  * 关闭 nginx：`nginx -s stop`
    * 使用系统命令：`taskkill /fi "imagename eq nginx.EXE" /f`
  * 修改配置文件后使用 `nginx -s reload` 重启
* 使用配置文件实现 nginx 功能
  * `conf/nginx.conf`

## CLI
* `-s` 传送信号给主进程，如：stop、quit、reopen、reload
* `-c` 设置配置文件路径，默认是 `conf/nginx.conf`

## 配置
### 反向代理
>即达到访问 nginx 代理服务器时跳转到指定服务器的目的，使用 `proxy_pass` 配置项
* 配置 nginx
```conf
http {
    # 可配置多个代理，根据权重来选择，若一台无法处理请求时，会将请求转发至另一台
    upstream tomcat_server {
        server localhost:80 weight=2;
        server 192.168.38.108:8899 weight=1;
    }

    server {
        listen       80;
        server_name  dev.c.vip.com;             # 虚拟域名
        location / {
            proxy_pass http://tomcat_server;     # 代理服务器，响应对虚拟域名的请求
        }
    }
}
```
* 配置 hosts
```conf
127.0.0.1 dev.c.vip.com
```

### 静态资源服务
```conf
location / {
    root   html;                   # 指定静态资源位置
    index  index.html index.htm;
}
```

## 参考
* 【中文】http://www.nginx.cn/doc/
* 【入门指南】http://wiki.jikexueyuan.com/project/nginx/
* 【入门到精通】http://tengine.taobao.org/book/index.html