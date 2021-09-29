/**
 * 组件样式文件
*/

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        lineHeight: 30,
        color: 'black',
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: 'center'
    },

    state: {
        textAlign: 'center'
    },

    button: {
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 20
    },

    input: {
        height: 30,
        padding: 0,
        paddingLeft: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 5
    },

    webviewWrap: {
        flex: 1
    },

    webview: {
        marginTop: 20,
        padding: 30,
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
    }
});

export default styles;