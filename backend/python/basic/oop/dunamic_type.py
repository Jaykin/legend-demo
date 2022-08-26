#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/4 17:43
@Desc   : 动态创建类型
- type()
- 元类（meta class）
"""

# =========================== 1、type() ===========================
def sayhello(self, name='word'):
    print('Hello, {} with {}\'s {}.'.format(name, self.language, self.sound))

# 创建类型(class 名称, 继承的父类元组, 类属性名称与值绑定)
Hello = type('Hello', (object,), dict(hello=sayhello, language='Chinese', sound='磁性男声'))

h = Hello()
print(type(h))      # <class '__main__.Hello'>
h.hello('Jay')


# =========================== 1、metaclass ===========================
# 根据 元类 创建 类，根据 类 创建 实例
# 类创建过程可通过在定义行传入 metaclass 关键字参数，或是通过继承一个包含此参数的现有类来进行定制

class ListMetaclass(type):
    # mcs: 当前准备创建的类
    # name: 类的名字
    # bases: 类继承的父类集合
    # attrs: 类的属性集合
    def __new__(mcs, name, bases, attrs):
        print(attrs.keys())
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(mcs, name, bases, attrs)

class MyList(list, metaclass=ListMetaclass):
    a = ''
    b = ''
    pass
