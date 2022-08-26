#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/4 19:28
@Desc   : User 实体
"""
from model import Model
from field import StringField, IntegerField

class User(Model):
    id = IntegerField('id')
    name = StringField('name')
    email = StringField('email')
    password = StringField('password')

    def __str__(self):
        return "id: {}, name: {}, email: {}, password: {}".format(self.id, self.name, self.email, self.password)
