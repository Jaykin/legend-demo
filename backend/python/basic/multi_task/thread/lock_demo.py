#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/6 16:48
@Desc   :
"""
import threading
"""
任何Python线程执行前，必须先获得GIL锁（Global Interpreter Lock），
然后，每执行100条字节码，解释器就自动释放GIL锁，让别的线程有机会执行。
这个GIL全局锁实际上把所有线程的执行代码都给上了锁，
所以，多线程在Python中只能交替执行，即使100个线程跑在100核CPU上，也只能用到1个核

GIL是Python解释器设计的历史遗留问题，通常我们用的解释器是官方实现的CPython，要真正利用多核，除非重写一个不带GIL的解释器
在Python中，可以使用多线程，但不要指望能有效利用多核。如果一定要通过多线程利用多核，那只能通过C扩展来实现
"""

balance = 0
lock = threading.Lock()

def change_balance(n):
    global balance
    balance += n
    balance -= n

def thread_run(n):
    for i in range(2000000):
        # 先获取锁
        lock.acquire()
        try:
            change_balance(n)
        finally:
            # 释放锁
            lock.release()

t1 = threading.Thread(target=thread_run, args=(5,))
t2 = threading.Thread(target=thread_run, args=(8,))
t1.start()
t2.start()
t1.join()
t2.join()

print(balance)  # 无锁时：26，有锁时：0
