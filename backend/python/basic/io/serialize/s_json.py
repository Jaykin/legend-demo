import json

json_filepath = 'files/numbers.json'

# ========================================  序列化 ========================================
# numbers = [2, 3, 5, 7, 11, 13]
# with open(json_filepath, 'w') as f:
#     json.dump(numbers, f)

# ========================================  反序列化 ========================================
# try:
#     with open(json_filepath, 'r') as f:
#         loaded_json = json.load(f)
# except FileNotFoundError:
#     print('json file 【' + json_filepath + '】 not found~')
# else:
#     print(loaded_json)


# ========================================  序列化实例 ========================================
class Student(object):
    def __init__(self, name, age, score):
        self.name = name
        self.age = age
        self.score = score

s = Student('Bob', 20, 88)
print(json.dumps(s, default=lambda obj: obj.__dict__))

json_str = '{"age": 20, "score": 88, "name": "Bob"}'
s_2 = json.loads(json_str, object_hook=lambda d: Student(d['name'], d['age'], d['score']))
print(s_2.__dict__)
