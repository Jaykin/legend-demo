#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/5 11:25
@Desc   : 在内存中读写str
"""
from io import StringIO

# 创建 StringIO
f = StringIO()
f.write('hello ')
f.write('jay~')
print(f.getvalue())
