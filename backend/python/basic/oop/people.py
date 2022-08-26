
class People(object):
    # 属性
    name = ''
    age = 0
    __weight = 0  # 私有属性

    # 构造方法
    def __init__(self, *args):
        self.name = args[0]
        self.age = args[1]
        self.__weight = args[2]

    # 实例方法
    def sayhello(self):
        print("{} 说：我 {} 岁了，体重是 {}kg。".format(self.name, self.age, self.__weight))
        self.__grow_up()

    # 私有方法
    def __grow_up(self):
        print("好好学习，天天向上！")
