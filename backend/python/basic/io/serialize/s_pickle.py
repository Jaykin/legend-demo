"""
pickle
"""
import pickle

d = dict(name='Jay', age=18, sex=1)

# ========================================  序列化 ========================================
# 把对象序列化成一个 bytes
d_bytes = pickle.dumps(d)
print(type(d_bytes))        # <class 'bytes'>

# 将 bytes 写入文件（file-like object）
# with open('files/dump_d.txt', 'wb') as f:
#     f.write(d_bytes)

# 直接将对象序列化后存入文件（file-like object）
# with open('files/dump_d2.txt', 'wb') as f:
#     pickle.dump(d, f)

# ========================================  反序列化 ========================================
# pickle.loads(): 先将文件（file-like object）读取到 bytes，再 load bytes 即可

# pickle.load
with open('files/dump_d.txt', 'rb') as f:
    d2 = pickle.load(f)
    print(d2)       # {'name': 'Jay', 'age': 18, 'sex': 1}


