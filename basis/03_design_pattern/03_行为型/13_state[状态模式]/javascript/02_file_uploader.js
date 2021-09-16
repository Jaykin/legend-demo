// 文件上传
// 文件包含多种状态

// 上传功能的实现
const uploadPlugin = {
    sign() {
        console.log( '开始文件扫描' );
    },
    pause() {
        console.log( '暂停文件上传' );
    },
    uploading() {
        console.log( '开始文件上传' );
    },
    del() {
        console.log( '删除文件上传' );
    },
    done() {
        console.log( '文件上传完成' );
    }
}

class Uploader {
    plugin = uploadPlugin;
    button1 = null;
    button2 = null;

    constructor(filename) {
        this.filename = filename;
        // 创建状态对象
        this.signState = new SignState(this);                   // 扫描
        this.uploadingState = new UploadingState(this);         // 上传
        this.pauseState = new PauseState(this);                 // 暂停
        this.doneState = new DoneState(this);                   // 完成
        this.errorState = new ErrorState(this);                 // 出错
        // 设置初始状态
        this.currState = this.signState;
    }

    init() {
        const _this = this;
        // 绑定关系
        this.button1 = {
            onClick() {
                _this.currState.clickHandler1();
            }
        };
        this.button2 = {
            onClick() {
                _this.currState.clickHandler2();
            }
        };
    }

    sign() {
        this.plugin.sign();
        this.currState = this.signState;
    }

    uploading() {
        this.plugin.uploading();
        this.currState = this.uploadingState; 
    }

    pause() {
        this.plugin.pause();
        this.currState = this.pauseState; 
    }

    done() {
        this.plugin.done();
        this.currState = this.doneState;
    }

    error() {
        console.log('文件上传失败');
        this.currState = this.errorState;
    }

    del() {
        this.plugin.del();
    }
}

// TODO 定义状态类