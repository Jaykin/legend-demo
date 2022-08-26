"""
列表推导式/列表解析式
- 提供了从序列创建列表的简单途径，将一些操作作用于某个序列的每个元素，用其获得的结果作为生成新列表的元素，或者根据确定的判定条件创建子序列
"""

list1 = [1, 2, 3]
list1_comp1 = [x * 2 for x in list1]
print(list1_comp1)   # [2, 4, 6]


# 生成子列表
list1_comp2 = [x * 2 for x in list1 if x > 1]
print(list1_comp2)  # [4, 6]


# 生成嵌套列表
list1_comp3 = [[x, x * 2] for x in list1]
print(list1_comp3)  # [[1, 2], [2, 4], [3, 6]]


# 多重循环
list2 = [1, 2, 3]
list3 = [3, 2, 1]
list2_comp1 = [x + y for x in list2 for y in list3]
print(list2_comp1)  # [4, 3, 2, 5, 4, 3, 6, 5, 4]


# 集合推导式
set1 = {1, 2, 3}
set1_comp1 = {x * 2 for x in set1}
print(set1_comp1)   # {2, 4, 6}


# 字典推导式
dict1 = {x: x ** 2 for x in (2, 4, 6)}
print(dict1)        # {2: 4, 4: 16, 6: 36}


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
