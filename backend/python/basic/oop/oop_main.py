#!/usr/bin/env python3
"""
面向对象
"""
from people import People
from student import Student
from jay import Jay

# 实例化
jay = People('Jay', 18, 120)
jay.sayhello()

# 类属性
print("类属性: ", People.age)
print("类属性: ", Student.age)


# ------------------------------------------------------单继承------------------------------------------------------
s = Student('Jay', 18, 120, 3)
s.sayhello()
# 实例属性
print(s.age, Student.age)   # 18 0


# ------------------------------------------------------多继承------------------------------------------------------
jj = Jay("Tim", 25, 80, 4, "Python")
# Jay.sayhello(jay)
jj.sayhello()
jj.b = 'b prop'
jj.e = 'e prop'

# ------------------------------------------------------ 属性赋值限制 ------------------------------------------------------
jay02 = Jay("Tim", 25, 80, 4, "Python")
# jay02.score = -1        # ValueError: score must between 0 ~ 100!
# jay02.score = '100'     # ValueError: score must be an integer!
jay02.score = 88

# -------------------------------------------------- 定制 toString ------------------------------------------------------
jay03 = Jay("Tim", 25, 80, 4, "Python")
print(s)
print(jay03)

# -------------------------------------------------- 类属性/实例属性 ------------------------------------------------------
# 访问顺序：实例属性 -> 类属性 -> 父类属性
jay04 = Jay("Tim", 25, 80, 4, "Python")
print(jay04.stu)    # jay instance stu
del jay04.stu
print(jay04.stu)    # jay stu
del Jay.stu
print(jay04.stu)    # stu stu
del Student.stu
# print(jay04.stu)    # AttributeError: 'Jay' object has no attribute 'stu'

