#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/5 11:31
@Desc   : 操作文件和目录
"""
import os
import random

base_path = '/Users/vivian/Desktop/workspace/legend-demo/backend/python/basic/io/sync_io/file/tmp'

print('获取当前目录的绝对路径: ', os.path.abspath('.'))    # /Users/vivian/Desktop/workspace/legend-demo/backend/python

# 创建新目录
dir_suffix = hash(random.Random().random())
dir_path = os.path.join(base_path, 'test_dir_' + str(dir_suffix)[0:6])
os.mkdir(dir_path)
print('创建新目录: ', dir_path)

# 重命名文件
os.rename(os.path.join(base_path, 'test.txt'), os.path.join(base_path, 'test.py'))
