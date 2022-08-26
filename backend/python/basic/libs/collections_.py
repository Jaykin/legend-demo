#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/7 16:01
@Desc   : collections（集合模块）
"""
import os
from collections import namedtuple, deque, defaultdict, OrderedDict, ChainMap, Counter

# ========================= namedtuple：用于创建自定的 tuple 对象 =========================
Circle = namedtuple('Circle', ['x', 'y', 'r'])
c = Circle(2, 3, 4)
print(c[0], c[1], c[2])     # 2 3 4
print(c.x, c.y, c.r)        # 2 3 4

# ========================= deque：高效实现插入和删除操作的双向列表，适合用于队列和栈 =========================
dq = deque(['a', 'b', 'c'])
dq.append('x')
dq.appendleft('y')
print("deque: ", type(dq), dq)      # deque(['y', 'a', 'b', 'c', 'x'])

# ========================= defaultdict：key 不存在时，会返回一个默认值的 dict =========================
d_dict = defaultdict(lambda: 'N/A')     # 传入 default value
d_dict['key1'] = 'abc'
print(d_dict['key1'], d_dict['key2'])   # abc N/A

# ========================= OrderedDict：可保持 Key 的顺序的 dict =========================
unsorted_dict = dict([('a', 1), ('b', 2), ('c', 3)])
print(unsorted_dict.keys())

sorted_dict = OrderedDict([('a', 1), ('b', 2), ('c', 3)])
print(sorted_dict.keys())

# ========================= ChainMap：可以把一组dict串起来并组成一个逻辑上的dict，查找的时候，会按照顺序在内部的dict依次查找 =========================
defaults = {
    'color': 'red',
    'user': 'guest',
    'weight': 10
}

command_line_args = {
    'color': 'green',
    'user': 'Jay'
}

chain_map = ChainMap(command_line_args, os.environ, defaults)
print(chain_map['color'])   # green
print(chain_map['weight'])  # 10

# ========================= Counter：是一个简单的计数器 =========================
# 统计字符出现的个数
counter = Counter()
for char in 'programing':
    counter[char] = counter[char] + 1
print(counter.get('p'))

print('\x00')   # \x 代表16进制，\o 代表8进制





