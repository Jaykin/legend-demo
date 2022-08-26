#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/7 19:43
@Desc   :
"""
import itertools


def pi(n):
    """
    计算 PI 的值
    """
    # step 1: 创建一个奇数序列: 1, 3, 5, 7, 9, ..., 2*n-1
    natual = itertools.takewhile(lambda x: x <= 2*n - 1, itertools.count(1))
    ood_natual = [x for x in natual if x % 2 == 1]

    # step 2: 添加正负符号并用4除: 4/1, -4/3, 4/5, -4/7, 4/9, ...
    s = [4/ood_natual[i] if i % 2 == 0 else -4/ood_natual[i] for i in range(n)]
    print(s)

    # step 3: 求和
    return sum(s)

print(pi(5))
