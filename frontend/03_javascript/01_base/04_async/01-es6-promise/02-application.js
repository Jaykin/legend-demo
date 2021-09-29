
    // 基于Node

    // 1.0 封装读取文件的Promise
    const fs = require('fs');
    const path = require('path');

    const readFilePromise = function (fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.toString())
                }
            });
        });
    }


    // 需求1：读取一个JSON文件数据并打印
    function demand01() {
        const fullFileName = path.resolve(__dirname, './data/data2.json');
        const result = readFilePromise(fullFileName);

        result.then(data => {
            console.log(data);
            return JSON.parse(data).a
        }).then(a => {
            console.log(a);
        }).catch(err => {
            console.log(err);
        });
    }
    //demand01();


    // 需求2：先读取data1.json，再读取data2.json
    const data1File = path.resolve(__dirname, './data/data1.json');
    const file1Result = readFilePromise(data1File);

    const data2File = path.resolve(__dirname, './data/data2.json');
    const file2Result = readFilePromise(data2File);

    function demand02() {
        file1Result.then(data1 => {
            console.log(data1);
            return file2Result.then(data2 => {
                return { data1, data2 }
            })
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err);
        });
    }
    //demand02();


    // 需求3：一起读取data1.json 和 data2.json，都读取完后再打印所有的数据
    function demand03() {
        Promise.all([file1Result, file2Result]).then(datas => {
            console.log(datas);
        }).catch(err => {
            console.log(err)
        });
    }
    //demand03();


    // 需求4：只要读取完了其中一个json文件，就打印读取的数据
    function demand04() {
        Promise.race([file1Result, file2Result]).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        });
    }
    //demand04();


    // 需求5：读取一个文件后过5S再读取另一个
        // 封装延迟ns的promise生成器
    function delayPromise(delayTime, data) {
        return new Promise(function (resolve, reject) {
            try {
                setTimeout(function () {
                    console.log(delayTime--);
                    if (delayTime) {
                        setTimeout(arguments.callee, 1000)
                    } else {
                        console.log('5S已过');
                        resolve(data);
                    }
                }, 1000);
            } catch (err) {
                reject(err);
            }
        })
    }

    function demand05() {
        var count = 5;
        file1Result.then(data1 => {
            console.log(data1);
            return delayPromise(count, data1);
        }).then((data1) => {
            return file2Result.then(data2 => {
                console.log({ data1, data2 })
            })
        }).catch(err => {
            console.log(err)
        })
    }
    demand05();
