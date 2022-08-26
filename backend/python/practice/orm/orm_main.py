#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/4 19:29
@Desc   :
"""

from user import User

u = User(id=12345, name='Jay', email='jay@orm.org', password='my-pwd')
u.save()
