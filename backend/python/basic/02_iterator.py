#!/usr/bin/env python3

# 迭代器 和 生成器

list = [1, 2, 3, 4]
it = iter(list)

for x in it:
    print(x, end = '-')




def fibonacci(n):
    a, b, counter = 0, 1, 0
    while True:
        if (counter > n):
            return
        yield a
        a, b = b, a + b
        counter += 1

f = fibonacci(10)

while True:
    print(next(f), end = ' ')