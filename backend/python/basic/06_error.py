#!/usr/bin/env python3

# 异常
import sys

def divide(x, y):
    try:
        result = x / y
    except ZeroDivisionError:
        print("division by zero!")
    except:
        print("Unexpected error:", sys.exc_info()[0])
        raise
    else:
        print("result is", result)
    finally:
        print("executing finally clause")

divide(2, 1)
divide(2, 0)
divide("2", "1")
