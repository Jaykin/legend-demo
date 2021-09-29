// 管理异步队列执行
class Task {
    constructor(perTime = 500) {
        this.list = [];
        this.taskDoneAfterFn = null;
        this.perTime = perTime; // 任务执行间隔(ms)
    }

    // 监听任务执行完成
    onTaskDone(fn) {
        this.taskDoneAfterFn = fn;
    }

    addTask(fnAsync) {
        const args = Array.prototype.slice.call(arguments, 1);
        this.list.push(async () => {
            try {
                await fnAsync.apply(null, args);
                // 等待一会儿
                await this.waitPerTime();
            } catch(err) {
                console.log('Task Error: ' + err.toString());
            }
        
            const next = this.list.shift();
            if (!next) {
                this.taskDoneAfterFn();
                return false;
            } else {
                return next();
            }
        });
    }

    async run() {
        if (!this.list.length) {
            console.log('无任务可执行！');
            return Promise.resolve();
          }
          await this.list.shift()();
    }

    waitPerTime() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, this.perTime);
        });
    }
}

module.exports = Task;