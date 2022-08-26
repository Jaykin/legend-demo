#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/5 11:25
@Desc   : 在内存读写二进制数据
"""
from io import BytesIO

f = BytesIO()
f.write('中文'.encode('utf-8'))
print(f.getvalue())     # b'\xe4\xb8\xad\xe6\x96\x87'
