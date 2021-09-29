#!/usr/bin/env python3

# 面向对象

# ------------------------------------------------------定义类------------------------------------------------------
class People:
    """自定义类"""
    # 构造方法
    def __init__(self, *params):
        self.name = params[0]
        self.age = params[1]
        self.__weight = params[2]

    # 属性
    name = ''
    age = 0
    # 私有属性
    __weight = 0

    # 方法
    def sayHello(self):
        print("{0} 说：我 {1} 岁了，体重是 {2}kg。".format(self.name, self.age, self.__weight))
        self.__growUp()
    # 私有方法
    def __growUp(self):
        print("好好学习，天天向上！")

# 实例化
# jay = People('Jay', 18, 120)
# jay.sayHello()


# ------------------------------------------------------单继承------------------------------------------------------
class Student(People):
    grade = ''

    def __init__(self, name, age, weight, grade):
        # 调用父类的构造函数
        People.__init__(self, name, age, weight)
        self.grade = grade
        self.__weight = weight

    # 覆写父类的方法
    def sayHello(self):
        print("{0} 说：我 {1} 岁了，体重是 {2}kg，我在读 {3} 年级".format(self.name, self.age, self.__weight, self.grade))

# s = Student('Jay', 18, 120, 3)
# s.sayHello()


# ------------------------------------------------------多继承------------------------------------------------------
class Speaker:
    topic = ''
    name = ''

    def __init__(self, name, topic):
        self.name = name
        self.topic = topic

    def sayHello(self):
        print("我叫 %s，我是一个演说家，我演讲的主题是 %s"%(self.name, self.topic))


class Sample(Speaker, Student):
    a = ''

    def __init__(self, name, age, weight, grade, topic):
        Student.__init__(self, name, age, weight, grade)
        Speaker.__init__(self, name, topic)

# test = Sample("Tim", 25, 80, 4, "Python")
# Speaker.sayHello(test)

