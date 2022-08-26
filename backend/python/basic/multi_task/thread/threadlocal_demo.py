#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/6 16:58
@Desc   : ThreadLocal
"""
import threading

"""
ThreadLocal
- 解决多线程共享全局变量产生的资源竞争，也解决了局部变量传参的麻烦
"""

# 创建全局 ThreadLocal 对象
local_school = threading.local()

def process_student():
    # 获取当前线程关联的 ThreadLocal
    std = local_school.student
    print('Hello, %s (in %s)' % (std, threading.current_thread().name))

def process_thread(name):
    # 绑定到 ThreadLocal 的 student
    local_school.student = name
    process_student()

t1 = threading.Thread(target= process_thread, args=('Alice',), name='Thread-A')
t2 = threading.Thread(target= process_thread, args=('Bob',), name='Thread-B')
t1.start()
t2.start()
t1.join()
t2.join()