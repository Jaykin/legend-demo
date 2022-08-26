#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/15 17:27
@Desc   :
"""
def application(environ, start_response):
    print(environ)
    start_response('200 OK', [('Content-Type', 'text/html')])
    name = environ['PATH_INFO'][1:] or 'web'
    body = '<h1>Hello, %s!</h1>' % name

    return [body.encode('utf8')]
