#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/6 16:37
@Desc   :
- _thread 模块：低级
- threading 模块：高级，对 _thread 模块的封装
"""
import threading
import time

"""
MainThread: 主线程，任何进程默认就会启动一个线程
多线程中，所有变量都由所有线程共享
"""

# 共享变量
share_a = 0

def loop():
    print('thread %s is running...' % threading.current_thread().name)

    n = 0
    while n < 5:
        n += 1
        print('thread %s >>> %s' % (threading.current_thread().name, n))
        time.sleep(1)

    global share_a
    share_a += 1
    print('thread %s ended.' % threading.current_thread().name)
    print("share_a:", share_a)  # 1

print('thread %s is running...' % threading.current_thread().name)

# 创建线程
t1 = threading.Thread(target=loop, name='LoopThread')
t1.start()
t1.join()

print('thread %s ended.' % threading.current_thread().name)
print("share_a:", share_a)  # 1

"""
thread MainThread is running...
thread LoopThread is running...
thread LoopThread >>> 1
thread LoopThread >>> 2
thread LoopThread >>> 3
thread LoopThread >>> 4
thread LoopThread >>> 5
thread LoopThread ended.
thread MainThread ended.
"""