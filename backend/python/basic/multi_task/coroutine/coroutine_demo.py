#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/6 17:21
@Desc   : Coroutine
"""
"""
协程/微线程/纤程（coroutine）
- 仅在一个线程内执行
- 子程序切换不是线程切换，而是由程序自身控制，因此，没有线程切换的开销
- 不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多
- 多进程+协程：可充分利用多核CPU，又充分发挥协程的高效率
- Python 对协程的支持是通过 generator 实现的
"""

def consumer():
    r = ''

    while True:
        n = yield r     # yield 接收 n，接着往后执行，接着返回 r
        if not n:
            print("n is False")
            return

        print('[CONSUMER] Consuming %s...' % n)
        r = '200 OK'

def produce(cg):
    # 启动生成器：传入 None
    cg.send(None)

    n = 0
    while n < 5:
        n = n + 1
        print('[PRODUCER] Producing %s...' % n)
        r = c.send(n)
        print('[PRODUCER] Consumer return: %s' % r)

    cg.close()

c = consumer()
produce(c)
"""
[PRODUCER] Producing 1...
[CONSUMER] Consuming 1...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 2...
[CONSUMER] Consuming 2...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 3...
[CONSUMER] Consuming 3...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 4...
[CONSUMER] Consuming 4...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 5...
[CONSUMER] Consuming 5...
[PRODUCER] Consumer return: 200 OK
"""

# print(c.send(None))
# print(c.send(1))
# print(c.send(2))
# print(c.send(0))
# c.close()
