#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/7 19:33
@Desc   : hashlib

- 摘要算法
"""
import hashlib
import hmac

md5 = hashlib.md5('hello jay~\n'.encode('utf-8'))
md5.update('hello vivian~\n'.encode('utf-8'))
md5.update('hello anan~\n'.encode('utf-8'))

md5_digest = md5.hexdigest()
print(len(md5_digest), type(md5_digest), md5_digest)

# hash 加盐 salt
message = b'Hello, world!'
key = b'secret'
h = hmac.new(key, message, digestmod='SHA1')
h_digest = h.hexdigest()
print(len(h_digest), type(h_digest), h_digest)
