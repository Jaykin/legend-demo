from student import Student
from speaker import Speaker


class Jay(Student, Speaker):
    """ 多继承 """

    # 定义允许绑定的属性名称
    __slots__ = ('a', 'b')

    # 类属性
    stu = 'jay stu'

    @property
    def score(self):
        return self.__score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self.__score = value

    def __init__(self, name, age, weight, grade, topic):
        # 实例属性
        self.a = 'a prop'
        self.d = 'd prop'
        self.__score = 0
        self.stu = 'jay instance stu'

        Student.__init__(self, name, age, weight, grade)
        Speaker.__init__(self, name, topic)

    # 定制 toString
    # 更多定制：https://docs.python.org/3/reference/datamodel.html#special-method-names
    def __str__(self):
        return 'Jay Object (name: {})'.format(self.name)

    __repr__ = __str__
