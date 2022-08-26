from people import People


class Student(People):
    """ 单继承 """
    stu = 'stu stu'

    def __init__(self, name, age, weight, grade):
        # 调用父类的构造函数
        People.__init__(self, name, age, weight)
        self.grade = grade
        self.__weight = weight

    # 覆写父类的方法
    def sayhello(self):
        print("{0} 说：我 {1} 岁了，体重是 {2}kg，我在读 {3} 年级".format(self.name, self.age, self.__weight, self.grade))
