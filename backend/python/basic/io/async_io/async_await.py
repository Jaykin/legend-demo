#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/7 11:32
@Desc   : 异步IO
"""
import asyncio
"""
asyncio 的编程模型就是一个消息循环。
我们从asyncio模块中直接获取一个EventLoop的引用，然后把需要执行的协程扔到EventLoop中执行，就实现了异步IO

>=3.5 支持 async/await
"""

# async 把 generator 标记为 coroutine
# await 在 coroutine 内调用另一个 coroutine
async def hello():
    print("Hello world!")
    # 异步调用 asyncio.sleep(1)
    r = await asyncio.sleep(1)
    print("Hello again!", type(r))

# 获取 EventLoop
loop = asyncio.get_event_loop()
# 执行 coroutine
loop.run_until_complete(hello())
loop.close()
