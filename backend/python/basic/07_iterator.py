"""
迭代器
"""
from collections.abc import Iterable

print(type(iter('abc')))                # str_iterator
print(type(iter([1, 2])))               # list_iterator
print(type(iter((1, 2))))               # tuple_iterator
print(type(iter({1, 2})))               # set_iterator
print(type(iter({'a': 1, 'b': 2})))     # dict_keyiterator

print(isinstance([], Iterable))         # True


# 创建迭代器对象
list1 = [1, 2, 3, 4]
it = iter(list1)

for n in it:
    print(n)


it2 = iter([1, 2, 3, 4, 5, 9])
while True:
    try:
        # 获得下一个值:
        x = next(it2)
        print(x)
    except StopIteration:
        # 遇到StopIteration就退出循环
        break
