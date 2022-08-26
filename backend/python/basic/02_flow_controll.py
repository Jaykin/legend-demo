"""
流程控制
"""

# if elif else
condition1 = False
condition2 = True
if condition1:
    print("condition1 is True")
elif condition2:
    print("condition2 is True")
else:
    print("nothing is True")


# while
count = 0
while count < 5:
    if count > 3:
        break
    print(count, " 小于 5")
    count += 1
else:
    print(count, " 大于或等于 5")


# for
for i in range(0, 5):
    if i > 3:
        continue
    print(i)
else:
    print("for is end")
