#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/5 10:55
@Desc   : 调试方法
- print: 输出
- assert: 断言
- logging: 日志
- pdb: python 调试器
"""
import logging

# ==================================== assert: 断言 ====================================
def foo(s):
    n = int(s)
    assert n != 0, 'n is zero!'     # 断言失败会抛 AssertionError
    return 10 / n

print(foo(1))


# ==================================== logging: 日志 ====================================
logging.basicConfig(level=logging.INFO)
def foo02(s):
    n = int(s)
    logging.info('n = %d' % n)      # INFO:root:n = 1
    return 10 / n

print(foo02(1))


