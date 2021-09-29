
/**
 * 全局提示
 *
 * */

/*
 * @content {string | ReactNode } - 提示内容
 * @duration {number} - 自动关闭的延时，单位秒
 * @onClose {function} - 关闭时的回调函数
 *
 * message.success(content, duration, onClose)
 message.error(content, duration, onClose)
 message.info(content, duration, onClose)
 message.warning(content, duration, onClose)
 message.warn(content, duration, onClose) // alias of warning
 message.loading(content, duration, onClose)

 message.config(options)
 message.destroy()
 * */

import { message } from 'antd';

// 自定义属性
message.config({
    top: 50,
    duration: 2
});

export default message;
