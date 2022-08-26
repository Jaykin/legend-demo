#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/15 17:26
@Desc   :
"""
from wsgiref.simple_server import make_server
from application import application

# 创建一个服务器，IP地址为空，端口是8000，处理函数是application
httpd = make_server('', 8080, application)
print('Serving HTTP on port 8080...')

# 开始监听HTTP请求
httpd.serve_forever()
