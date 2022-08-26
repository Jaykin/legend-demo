#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/7 19:21
@Desc   : base64
"""
import base64

b = b'string jay'
print(type(b'string jay'))  # <class 'bytes'>，bytes 记录的是内存中的原始数据，操作单位是字节
print(b'string jay')


print(base64.b64encode(b'string jay'))      # b'c3RyaW5nIGpheQ=='
print(base64.b64decode(b'c3RyaW5nIGpheQ=='))
