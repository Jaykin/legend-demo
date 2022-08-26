#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/6 15:50
@Desc   : fork 仅支持类 UNIX 系统

创建子进程：fork（系统调用）
    - 自动把当前进程（称为父进程）复制了一份（称为子进程）
    - 调用一次，返回两次：子进程永远返回0，父进程返回子进程的ID
"""

import os

# 获取当前进程ID
# print('Process (pid:%s) start...' % os.getpid())
a = 2

# 创建子进程
pid = os.fork()
if pid == 0:
    a = 3
    print('child: I am child process (pid:%s) and my parent is (pid:%s).' % (os.getpid(), os.getppid()))
else:
    print('main: (pid:%s) just created a child process (pid:%s).' % (os.getpid(), pid))

print('child: ' if pid == 0 else 'main: ', 'current pid:', pid, a)

"""
>>>
main: (pid:81863) just created a child process (pid:84731).
main current pid: 84731 2
child: I am child process (pid:84731) and my parent is (pid:81863).
child current pid: 0 3
"""
