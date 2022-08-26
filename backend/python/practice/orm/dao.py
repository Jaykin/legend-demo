# -*- coding: utf-8 -*-
"""
@Author : jay.wang
@Date   : 2022/7/26 20:00
@Desc   :
"""
import ksycopg2

conn = ksycopg2.connect(database="POIT_GECC_DAAS", user="SYSTEM", password="123", host="192.168.100.71", port="54321")
cur = conn.cursor()
cur.execute("select version()")
conn.commit()
conn.close()

if __name__ == '__main__':
    print(1)
