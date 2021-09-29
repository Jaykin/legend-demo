// execl to json
const xlsx = require('xlsx');
const fs = require('fs');
const process = require('process');
const program = require('commander');
const axios = require('axios');

const Task = require('./task');

// 解析 cli
program
    .version('1.0.0', '-v, --version')
    .option('-fe, --file <file>', '需要解析的 xlxs 文件名')
    .option('-ty, --type <type>', '更新类型：1-新增、2-替换、3-删除无效coupon')
    .parse(process.argv);

if (program.type == 3) {
    // 删除 coupon conf
    delCouponConf();
} else {
    // 更新 coupon conf
    updateCouponConf();
}

// 查询券信息
function getCouponInfoByMid(mid) {
    return axios.get(`http://weixin-api.vip.com/act/coupon/getCouponInfoByMid?mid=${mid}&api_key=ced55c95388f4e92adc4f2fd9b00f150`);
}

// 写文件
function writeJsonToTxtFile(path, content) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
    fs.writeFileSync(path, content);
}

// 删除券信息配置
function delCouponConf() {
    const tasker = new Task();
    let hadJsonData = JSON.parse(fs.readFileSync('/Users/ming/Desktop/dy_coupon/config/had.txt').toString()); // 已有的配置
    let needDelJson = {};
    Object.keys(hadJsonData).forEach((key) => {
        tasker.addTask(() => {
            return new Promise((resolve, reject) => {
                getCouponInfoByMid(key)
                    .then((res) => {
                        if (res.status == 200 && res.data) {
                            if (res.data.code == 10003) {
                                // 无效券
                                needDelJson[key] = hadJsonData[key];
                                console.log(`需删除的券配置：mid-${key}, couponNo-${hadJsonData[key]}`);
                                // 删除券配置
                                delete hadJsonData[key];
                            } else {
                                // console.log(`券信息正常: mid-${key}, couponNo-${hadJsonData[key]}`);
                            }
                            resolve();
                        } else {
                            throw new Error('getCouponInfoByMid error! mid: ' + key);
                        }
                    }).catch((err) => {
                        console.log(err.toString());
                        resolve();
                    });
            });
        });
    });

    // 执行
    tasker.onTaskDone(() => {
        console.log(`总计：${Object.keys(hadJsonData).length}，本次需删除：${Object.keys(needDelJson).length} 条`);
        writeJsonToTxtFile('/Users/ming/Desktop/dy_coupon/config/deled-had.txt', JSON.stringify(hadJsonData));
    });
    tasker.run();
}

// 更新券信息配置
function updateCouponConf() {
    // 解析 xlsx
    const xlsxFileName = program.file;
    if (!xlsxFileName) {
        console.log('xlsx 文件名为空！');
        process.exit(1);
    }
    const workbook = xlsx.readFile('/Users/ming/Desktop/dy_coupon/'+xlsxFileName+'.xlsx');
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]]
    const data =xlsx.utils.sheet_to_json(sheet)
    console.log(`源数据记录条数：${data.length}`);

    // 检验新数据的格式 & 重复
    let jsonData = {};
    const reg = /^[0-9]+$/;
    data.forEach((record) => {
        const keys = Object.keys(record);
        const mid = String(record[keys[0]]).trim();
        const couponId = String(record[keys[1]]).trim();

        // 格式检查(mid、couponId 必须是纯数字)
        if (!reg.test(mid)) {
            console.log(`格式不规范，mid: ${mid}`);
            process.exit(1);
        }

        if (!reg.test(couponId)) {
            console.log(`格式不规范，couponId: ${couponId}`);
            process.exit(1);
        }

        // 重复检查
        if (jsonData[mid]) {
            console.log(`源数据有重复 mid：${mid}`);
            process.exit(1);
        }

        jsonData[mid] = couponId;
    });
    console.log('源数据解析后记录条数：', Object.keys(jsonData).length);
    console.log(jsonData);

    // 去重 & 合并新旧数据
    let hadJsonData = JSON.parse(fs.readFileSync('/Users/ming/Desktop/dy_coupon/config/had.txt').toString()); // 已有的配置
    const hadOldLen = Object.keys(hadJsonData).length;
    Object.keys(jsonData).forEach((key) => {
        if (hadJsonData[key]) {
            if (program.type == 2) {
                // 替换
                console.log(`已配置数据有重复 mid：${key}，couponId：${hadJsonData[key]}，被替换为 ${jsonData[key]}`);
            } else {
                // 不替换
                console.log(`已配置数据有重复 mid：${key}，couponId：${hadJsonData[key]}`);
                process.exit(1);
            }
        }
        hadJsonData[key] = String(jsonData[key]);
    });

    const hadLen = Object.keys(hadJsonData).length;
    console.log(`共：${hadLen}条，原：${hadOldLen}条，新增：${Object.keys(jsonData).length}条`);

    // 输出新配置文件（做备份）
    const jsonStr = JSON.stringify(hadJsonData);
    const outputPath = '/Users/ming/Desktop/dy_coupon/config/new_'+(+new Date)+'_'+hadLen+'.txt';
    fs.writeFileSync(outputPath, jsonStr);

    // 替换旧配置文件（had.txt）
    // const outputPath02 = '/Users/ming/Desktop/dy_coupon/config/had.txt';
    // if (fs.existsSync(outputPath)) {
    //     fs.unlinkSync(outputPath);
    // }
    // fs.writeFileSync(outputPath02, jsonStr);
}
