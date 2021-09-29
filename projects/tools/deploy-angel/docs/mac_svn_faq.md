
### `svn upgrade`命令报错

```bash
{ Error: Command failed: cd /path/to/your/svn/working/copy && svn update
svn: E155036: Please see the 'svn upgrade' command
svn: E155036: The working copy at '/path/to/your/svn/working/copy'
is too old (format 10) to work with client version '1.9.5 (r1770682)' (expects format 31). You need to upgrade the working copy first.


    at ChildProcess.exithandler (child_process.js:206:12)
    at emitTwo (events.js:106:13)
    at ChildProcess.emit (events.js:191:7)
    at maybeClose (internal/child_process.js:877:16)
    at Socket.<anonymous> (internal/child_process.js:334:11)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:188:7)
    at Pipe._handle.close [as _onclose] (net.js:498:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'cd /path/to/your/svn/working/copy && svn update' }
```

解决方法1：
尝试在svn working copy 运行 `svn upgrade` 命令

解决方法2：
参考以下链接：
- http://stackoverflow.com/questions/26165001/unable-to-upgrade-svn-working-copy
- https://blog.elijaa.org/2011/10/20/error-working-copy-is-too-old-format-10-created-by-subversion-1-6/
- http://blog.csdn.net/jabony/article/details/22887483
- http://www.cnblogs.com/onmyway20xx/p/4108025.html


### svn无法获取用户名或密码

```bash
svn: E170001: Can't get username or password
```

命令行进入working copy根目录

```bash
svn update
```

命令行出现提示时，输入你的密码：

```bash
Updating '.':
Authentication realm: <svn://192.168.1.206:3690> fengche
Password for <your-username>: <输入你的密码>
```
