#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/6 15:51
@Desc   : 跨平台创建进程
"""
from multiprocessing import Process
import os

# 子进程需要执行的任务
def child_process_run(name):
    print('Run child process %s (%s)...' % (name, os.getpid()))

# 创建子进程
if __name__ == '__main__':
    child_process = Process(target=child_process_run, args=('test',))
    child_process.start()  # 启动子进程
    child_process.join()   # 等待子进程执行完任务
    print('Child process end.')

print(os.getpid(), __name__)     # mp_main__、__main__

