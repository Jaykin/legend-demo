/**
 * React Native 与 Webview交互
*/

import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Button, 
    WebView,
    TextInput,
    Alert
} from 'react-native';
import styles from './styles';

 /**
  * helpers
 */
function showModalTips(opts) {
    const title = opts.title || '温馨提示';
    const content = opts.content || '';

    Alert.alert(title, content)
};
const webviewSource = require('./webSide.html'); 

/**
 * 组件类Webview
*/
export default class Webview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: '',
            status: '[loading] Waiting...' 
        };
    }
    
    webview     // webview实例

    /** @param {String} type - 通信类型
     * send 传递数据
     * receive 获取数据
     * call 调用功能
    */
    getProtocolData(type, data) {
        return JSON.stringify({
            command: type || '',
            payload: data || ''
        })
    }

    handleInputChanged(val) {
        this.setState({ text: val })
    }

    // webview加载网页失败
    handleLoadWebError() {
        showModalTips({ content: '网页加载失败，请稍后重试！' });
        this.setState({ status: '[error] 网页加载失败' });
    }

    // webview加载网页成功
    handleLoadWebSuccess() {
        this.setState({ status: '[success] 网页加载完成' });
    }

    // 监听webview传入的数据
    handleReceiveFromWeb(e) {
        const data = JSON.parse(e.nativeEvent.data);
        const command = data.command;

        if (command === 'receive') {
            this.webview.postMessage(this.getProtocolData('send', this.state.text || 'This is RN!'))
        } else if (command === 'send') {
            this.setState({ status: `[Receive From Web] ${data.payload}`})
        } else if (command === 'call') {
            this.setState({ text: 'Changed From Wed' })
        }
    }

    handleSendToWeb(e) {
        const data = this.state.text || 'This is RN!'

        this.setState({ status: `[Send To Web] ${data}`});

        this.webview.postMessage(this.getProtocolData('send', data));
    }

    handleGetFromWeb(e) {
        this.webview.postMessage(this.getProtocolData('receive'));
    }

    handleCallWeb() {
        this.webview.postMessage(this.getProtocolData('call'));
    }

    render() {
        const { text, status } = this.state;

        return (
            <View style={ styles.webviewWrap }>
                <Text style={ styles.title }>React Native Side</Text>
                <Text style={ styles.state }>{ status }</Text>
                <TextInput 
                    onChangeText={ this.handleInputChanged.bind(this) }
                    placeholder="请输入..."
                    value={ text }
                    underlineColorAndroid="transparent"
                    style={ styles.input }
                />
                <View style={ styles.button }>
                    <Button 
                        title="Send To Web" 
                        onPress={ this.handleSendToWeb.bind(this) }
                    />
                </View>
                <View style={ styles.button }>
                    <Button 
                        title="Get From Web" 
                        onPress={ this.handleGetFromWeb.bind(this) }
                    />
                </View>
                <View style={ styles.button }>
                    <Button 
                        title="Call Web" 
                        onPress={ this.handleCallWeb.bind(this) }
                    />
                </View>

                <WebView 
                    ref={ w => this.webview = w }
                    source={ webviewSource }
                    javaScriptEnabled={ true }
                    onMessage={ this.handleReceiveFromWeb.bind(this) }
                    onLoad={ this.handleLoadWebSuccess.bind(this) }
                    onError={ this.handleLoadWebError.bind(this) }
                    style={ styles.webview }
                />
            </View>
        )
    }
}