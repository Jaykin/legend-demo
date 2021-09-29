/**
 * 计时器
*/

class Timer {
    constructor() {
        this.startTime = 0
        this.endTime = 0
    }

    setStart() {
        this.startTime = new Date().getTime()
    }

    setEnd() {
        this.endTime = new Date().getTime()
        console.log(`耗时：${this.endTime - this.startTime}ms`)
    }
}