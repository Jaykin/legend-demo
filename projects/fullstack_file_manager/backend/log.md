# 1/11/2017 ： 断点续传 #

time:1/11/2017 6:08:12 PM

修改数据库 file 表字段：

	alter table file change column `deleted` `status` integer default 0

新增 chunk_file 表