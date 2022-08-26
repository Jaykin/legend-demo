#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/6 16:22
@Desc   : 进程池
"""
import os
import random
import time
from multiprocessing import Pool


def long_time_task(name):
    print('Run task %s (%s)...' % (name, os.getpid()))

    start = time.time()
    time.sleep(random.random() * 3)
    end = time.time()

    print('Task %s runs %.2f seconds.' % (name, (end - start)))

if __name__ == '__main__':
    print('Parent process %s.' % os.getpid())

    pool = Pool(4)
    for i in range(5):
        pool.apply_async(long_time_task, args=(i,))
    pool.close()
    pool.join()

    print('All subprocesses done.')
