#!/usr/bin/env python3

'''
约瑟夫生者死者小游戏
30 个人在一条船上，超载，需要 15 人下船。
于是人们排成一队，排队的位置即为他们的编号。
报数，从 1 开始，数到 9 的人下船。
如此循环，直到船上仅剩 15 人为止，问都有哪些编号的人下船了呢？
'''

# 方法一
def func1():
    counter = 0
    maxNum = 15
    currNum = 30
    total = range(1, 31)
    idxs = []

    while (currNum > maxNum):
        for i in total:
            if i in idxs:
                pass
            else:
                counter += 1
                if counter == 9:
                    counter = 0
                    idxs.append(i)
                    currNum -= 1
                    print('{0}号下船了'.format(i))


# 方法二
def func2():
    people = list(range(1, 31))

    while len(people) > 15:
        i = 1
        while i < 9:
            people.append(people.pop(0))    # 精髓部分，将不用下船的人往list末尾加
            i += 1
        print('{:2d}号下船了'.format(people.pop(0)))


# 测试两种方法的性能
import timeit

print('方式1 耗时：{0}s'.format(timeit.timeit(func1, number = 1)))     # 0.00015065500000000127s
print('方式2 耗时：{0}s'.format(timeit.timeit(func2, number = 1)))     # 0.00010766299999999916s
