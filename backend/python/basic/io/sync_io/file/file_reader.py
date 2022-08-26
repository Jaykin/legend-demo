#!/usr/bin/env python3

"""
文件读取
- 1、打开文件
- 2、读取文件
- 3、关闭文件
"""

file_path = 'files/pi_digits.txt'

# 读取整个文件：open - 打开文件、with - 可自动关闭文件、read - 读取文件内容、file_object - 表示文件的对象
print('读取整个文件: ' + file_path)
with open(file_path) as file_object:
    # print(type(file_object))    # <class '_io.TextIOWrapper'>
    contents = file_object.read()
    print(contents)


# 逐行读取文件
print('逐行读取文件: ' + file_path)
with open(file_path) as file_object:
    for line in file_object:
        print(line.rstrip())

# 使用文件内容
print('使用文件内容: ' + file_path)
with open(file_path) as f:
    lines = f.readlines()

pi_str = ''
for line in lines:
    pi_str += line.strip()
print('pi_str: ' + pi_str)
print(float(pi_str) * 2)
