#!/usr/bin/env python3

# 推导式
def listDerivative01():
    vec = [2, 4, 6]
    return [3 * x for x in vec]
print('列表推导01：', listDerivative01())


# 生成嵌套列表
def listDerivative02():
    vec = [2, 4, 6]
    return [[x, x * 2] for x in vec]
print('列表推导02：', listDerivative02())


#  加上 if子句 作为过滤器
def listDerivative03():
    vec = [2, 4, 6]
    return [x * 3 for x in vec if x > 3]
print('列表推导03：', listDerivative03())


# 循环技巧
def listDerivative04():
    vec1 = [2, 4, 6]
    vec2 = [4, 3, -9]
    ret1 = [x + y for x in vec1 for y in vec2]
    ret2 = [vec1[i] * vec2[i] for i in range(len(vec1))]
    print('列表推导04-1', ret1)
    print('列表推导04-2', ret2)
listDerivative04()


# 将3x4的矩阵列表转换为4x3列表
def listDerivative05():
    matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
    ]
    ret = [[row[i] for row in matrix] for i in range(4)]
    return ret
print('列表推导05：', listDerivative05())


# 集合推导式
def setDerivative():
    set1 = { x for x in 'abcdddskkfas' if x not in 'abc' }
    print('集合推导01-1', set1)
setDerivative()

# 字典推导式
def dictDerivative():
    dict1 = { x: x ** 2 for x in (2, 4, 6) }
    print('字典推导01-1', dict1)
dictDerivative()

# 字典遍历
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)

# 序列遍历
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)

# 同时遍历两个 或 更多的序列
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']
for q, a in zip(questions, answers):
    print('What is your {0}?  It is {1}.'.format(q, a))    

# 反向遍历序列
for i in reversed(range(1, 10, 2)):
    print(i)

# 按顺序遍历序列
basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
for f in sorted(basket):
    print(f)