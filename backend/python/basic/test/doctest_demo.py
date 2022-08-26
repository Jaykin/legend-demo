#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/5 11:07
@Desc   : 文档测试
- 运行测试
- 作为示例调用
"""


def abs_demo(n):
    """
    Function to get absolute value of number.

    Example:
    >>> abs_demo(1)
    1
    >>> abs_demo(-1)
    1
    >>> abs_demo(0)
    1
    """
    return n if n >= 0 else (-n)

if __name__ == '__main__':
    # 执行文档测试
    import doctest
    doctest.testmod()
