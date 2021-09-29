
/**
 * @param { Date } date - 日期对象
 * @return { string } - 日期字符串，如：2017/05/02 11:15:34
 * */

export function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let second = date.getSeconds();

    return year + '/' + (month>=10?month:'0'+month) + '/' + (day>=10?day:'0'+day) + ' ' + (hour>=10?hour:'0'+hour) + ':' + (min>=10?min:'0'+min) + ':' + (second>=10?second:'0'+second);
}