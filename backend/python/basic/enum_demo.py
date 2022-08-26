#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/4 17:30
@Desc   : 枚举类
"""
from enum import Enum, unique

@unique
class WeekDay(Enum):
    Sun = 0  # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6


print(type(WeekDay.Mon))    # <enum 'WeekDay'>
print(WeekDay.Mon)
print(WeekDay['Tue'])
print(WeekDay.Wed.value)
print(WeekDay(0))
for name, member in WeekDay.__members__.items():
    print(name, ' => ', member)
