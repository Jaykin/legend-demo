#!/usr/bin/env python3

# 异常
import sys


def divide(x, y):
    # 捕获异常
    try:
        result = x / y
    # 处理指定异常
    except ZeroDivisionError:
        print("division by zero!")
    except FileNotFoundError:
        # 啥都不做
        pass
    except Exception:
        print("Unexpected error:", sys.exc_info()[0])
        # 抛出异常 - 之后的代码不会执行
        raise
    # try 中的代码块未发生异常时执行
    else:
        print("result is", result)
    # 指定最终都会执行的代码块
    finally:
        print("executing finally clause")
    print('Jay Tail~')


# divide(2, 1)
# divide(2, 0)
# divide("2", "1")
