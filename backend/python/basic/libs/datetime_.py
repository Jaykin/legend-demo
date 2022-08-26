#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/7 15:30
@Desc   : datetime（用于处理日期和时间）

日期字符格式
-
"""
from datetime import datetime, timedelta

print("获取当前日期和时间: ", datetime.now(), type(datetime.now()))
print("获取指定日期和时间: ", datetime(2022, 2, 17, 12, 12, 23, 999))  # 999 为微秒（microsecond）
print("从 datetime 获取时间戳(秒): ", datetime.now().timestamp())  # 1657179600.043799 整数部分是秒，小数部分是微秒
print("从时间戳获取 datetime: ", datetime.fromtimestamp(1429417200.0))    # 2015-04-19 12:20:00
print("str 转换为 datetime: ", datetime.strptime('2015-6-1 18:19:59', '%Y-%m-%d %H:%M:%S'))
print("datetime 转换为 str: ", datetime.strftime(datetime.now(), '%Y年%m月%d日 %H:%M:%S'))
print("datetime 的加减: ", datetime.now() + timedelta(days=1))

