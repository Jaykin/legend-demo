$(function() {
    getArrangeId();
});

// const doctorInfo = {
//     hospitalId: '2004',
//     channelId: '9000234',
//     doctorSn: '710570381',
//     hosDeptName: '心理睡眠专科',
//     hosDeptId: '7130486',
//     doctorName: '李艳',
//     doctorPic: 'http://f1.yihuimg.com/TFS/upfile/doctor/200/6BE4D4C591E74D69A8D8144212BD11C6.jpg',
//     doctorUid: '37779',
//     doctorClinicName: '主任医师',
//     registerDate: '2019-06-24',
//     invalidDate: '2019-06-24 12:00:00',
//     commendTime: '11:00-11:30'
//     fee: 3000
// }

const doctorInfo = {
    hospitalId: '2004',
    channelId: '9000234',
    doctorSn: '710923518',
    hosDeptName: '心理睡眠专科',
    hosDeptId: '7130486',
    doctorName: '麦嘉泳',
    doctorPic: '',
    doctorUid: '710486367',
    doctorClinicName: '主治医师',
    registerDate: '2019-06-18',
    invalidDate: '2019-06-18 12:00:00',
    commendTime: '10:00-10:30',
    fee: 1000
}

/**
 * 设置登录态等cookie，需先从app或者公众号抓包
 */
function setCookie() {
    const cookie = 'jkzlAn_ct=1560491413097; jkzlAn_c=-1; jkzlAn_channelid=9000234; jkzlAn_p=-1; jkzlAn_userid=14414243; jkzlAn_utm_source=0.0.h.1026.bus010.0__0.0.h.1026.bus010.0; _YyghSysTrackUUID=14134933130; jkzlAn_refercode=; jkzlAn_sid=73EB4244-91FE-4457-8356-F3B0A402A7E9; jkzlAn_uuid=C27F3DE5-48B8-4DA5-8016-B6C1E0F15B6A; TOKEN_3C3151694D7C32C90A43A84C11B4A628=3CC283769F334B3982FE5C5A17360486; YiHu_UserJosn=eyJBY2NvdW50U24iOjE0NDE0MjQzLCJMb2dpbklkIjoiMTg4MjUxODAzNTAiLCJTZWNTdHIiOiJCMTA1NjkyNUY1NEIyRjFGMzgwNUMzN0YwQTc4Mzg3MCIsIlVzZXJOYW1lIjoiQmluZ28iLCJDYXJkTnVtYmVyIjoiNjcyOTc3MTIyIn0%3d';
    const cookies = cookie.split('; ');
    cookies.forEach(item => {
        document.cookie = item + ';domain=.yihu.com;';
    });
}

/**
 * 获取某天待预约的id，预约未开始前获取不到，需要开售后才获取到
 */
function getArrangeId() {
    setCookie();
    $.ajax({
        url: 'http://appoint.yihu.com/appoint/do/doctorArrange/getArrangeWater',
        data: {
            doctorSn: doctorInfo.doctorSn,
            hospitalId: doctorInfo.hospitalId,
            channelId: doctorInfo.channelId
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: 'POST',
        dataType: 'json',
        success: (res) => {
            if (res && res.Code == 10000) {
                console.log('------> getArrangeId', res.Result);
                const date = doctorInfo.InvalidDate
                res.Result.forEach(item => {
                    if (item.InvalidDate === doctorInfo.invalidDate) {
                        getNumber(item.ArrangeID);
                    }
                });
            }
        }
    })
}

/**
 * 获取待预约场次的具体信息
 * @param {number} arrangeId 
 */
function getNumber(arrangeId) {
    $.ajax({
        url: 'http://appoint.yihu.com/appoint/do/registerInfo/getNumbers',
        data: {
            arrangeId,
            hospitalId: doctorInfo.hospitalId,
            channelId: doctorInfo.channelId,
            appliedDepartment: '',
            ClinicCard: ''
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: 'POST',
        dataType: 'json',
        success: (res) => {
            if (res && res.Code == 10000) {
                console.log('------> getNumber', res.Result);
                res.Result.forEach(item => {
                    if (item.CommendTime === doctorInfo.commendTime) {
                        item.arrangeId = arrangeId;
                        guahao(item);
                    }
                });
            }
        }
    });
}

/**
 * 提交挂号信息
 * @param {object} item 
 */
function guahao(item) {
    $.ajax({
        url: 'http://appoint.yihu.com/appoint/do/registerInfo/register',
        data: {
            doctorRegOrder: `{"waterId":"${item.arrangeId}","waitingInfor":"--+${doctorInfo.commendTime}","store":"${item.Store}","serialNo":"0","memberSn":"40591585","memberName":"杨淑贤","memberPhone":"18825180350","memberAddress":"","memberBirthday":"1967-12-11","memberSex":"2","memberId":"40591585","othercard":"","guardianmembersn":"","identitytype":"1","memberZhengjianid":"440***********4565","memberIdcard":"440***********4565","accManageGoodSn":null,"birthday":"1967-12-11","regpaytype":"","cliniccard":"90369215","applyNo":"","ClinicCard":"90369215","CardType":"1","mobile":"18825180350","isread":"1","doctorSn":"${doctorInfo.doctorSn}","hosDeptId":"${doctorInfo.hosDeptId}","hosDeptName":"${doctorInfo.hosDeptName}","hospitalId":"2004","hospitalName":"广东省中医院总院","doctorService_gh":"2","doctorUid":"${doctorInfo.doctorUid}","doctorName":"${doctorInfo.doctorName}","doctorPic":"${doctorInfo.doctorPic}","doctorClinicName":"${doctorInfo.doctorClinicName}","GH_HosProId":"19","GH_HosProName":"广东","GH_HosCityId":"200","GH_HosCityName":"广州","registerDate":"${doctorInfo.registerDate}","timeId":1,"arrangeId":"${item.arrangeId}","ghAmount":${doctorInfo.fee},"securityDeposit":0,"ghfeeway":3,"ModeId":1,"GhFee":0,"AllFee":${doctorInfo.fee},"availablenum":13,"UnOpened":false,"FHTimes":"21:00","FHDays":"8","accountSn":14414243,"cardNumber":"672977122","loginId":"18825180350","channelId":"9000234","utm_source":"0.0.h.1026.bus010.0__0.0.h.1026.bus010.0"}`,
            ghFormCon: `[{"keyValue":"","keyName":"name"},{"keyValue":"90369215","keyName":"ClinicCard"},{"keyValue":"1","keyName":"CardType"},{"keyValue":"440***********4565","keyName":"CardNo"},{"keyValue":"2","keyName":"sex"},{"keyValue":"1967-12-11","keyName":"birthday"},{"keyValue":"1","keyName":"isread"},{"keyValue":"18825180350","keyName":"mobile"},{"keyValue":"0","keyName":"cmb_disease"},{"keyValue":"0","keyName":"cmb_disease"},{"keyValue":"未确诊","keyName":"cmb_diseaseName"}]`
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: 'POST',
        dataType: 'json',
        success: (res) => {
            if (res && res.Code == 10000) {
                alert('挂号成功，订单号：' + res.Orderid);
                console.log('------> guahao', res.Orderid);
            }
        }
    });
}
