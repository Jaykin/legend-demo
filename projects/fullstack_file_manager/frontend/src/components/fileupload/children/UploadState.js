import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Button, Progress } from 'antd';

/**
 * 显示文件上传状态
*/

class UploadState extends Component {
    shouldComponentUpdate(nextProps) {
        const { uploadState, uploadPercent } = this.props;

        if (uploadState === nextProps.uploadState && uploadPercent === nextProps.uploadPercent) {
            return false;
        }

        return true;
    }

    // 开始上传
    handleUpload(e, isUpload) {
        const { uploadFile, fileId } = this.props;

        e && e.preventDefault();
        uploadFile(fileId, isUpload || false);
    }

    // 取消上传
    handleCancelUpload(e) {
        const { cancelFile, fileId } = this.props;

        e && e.preventDefault();
        cancelFile(fileId);
    }

    // 查看文件
    handleShow(e) {
        e && e.preventDefault();
        const { fileName } = this.props;

        window.open('?file_name=' + encodeURIComponent(fileName));
    }

    // 根据不同状态生成不同形式的组件
    generateComponent() {
        const { uploadState, uploadPercent } = this.props;

        switch(uploadState) {
            // 上传前
            case 'ready': {
                return (
                    <div>
                        <Button type='primary' style={{ marginRight: 8 }} onClick={() => {this.handleUpload()}}>上传文件</Button>
                        <a href="#" onClick={(e) => {this.handleCancelUpload(e)}}>取消</a>
                    </div>
                )
            }
            case 'uploading': {
                return (
                    <div>
                        <div style={{ display:'inline-block',marginRight: 8 }}>
                            <span style={{ marginRight: 6,color:'#ccc' }}>上传中</span>
                            <Progress type="circle" percent={uploadPercent} width={30}></Progress>
                        </div>
                        <a href="#" onClick={(e) => { this.handleCancelUpload(e)}}>取消</a>
                    </div>
                )
            }
            // 上传完成
            case 'done': { return <span style={{color:'#ccc'}}>已上传</span> }
            // 取消上传
            case 'cancel': { return <span style={{color:'#ccc'}}>已取消</span> }
            case 'isDupName': {
                return (
                    <div>
                        <p style={{color:'#fa0'}}>有同名文件</p>
                        <div>
                            <a href="#" onClick={(e) => {this.handleShow(e)}}>查看文件</a>
                            <a href="#" onClick={(e) => {this.handleUpload(e, true)}} style={{marginLeft:5,marginRight:5}}>继续上传</a>
                            <a href="#" onClick={(e) => {this.handleCancelUpload(e)}}>取消</a>
                        </div>
                    </div>
                )
            }
            case 'isDupType': {
                return (
                    <div>
                        <p style={{color:'#fa0'}}>分类下文件重复</p>
                        <div>
                            <a href="#" onClick={(e) => {this.handleShow(e)}}>查看文件</a>
                            <a href="#" onClick={(e) => {this.handleUpload(e, true)}} style={{marginLeft:5,marginRight:5}}>覆盖原文件</a>
                            <a href="#" onClick={(e) => { this.handleCancelUpload(e)}}>取消</a>
                        </div>
                    </div>
                )
            }
            case 'isUploading': {
                return (
                    <div>
                        <p style={{color:'#fa0'}}>请稍后上传</p>
                        <div>
                            <a href="#" onClick={(e) => {this.handleUpload(e, true)}} style={{marginRight:5}}>继续上传</a>
                            <a href="#" onClick={(e) => { this.handleCancelUpload(e)}}>取消</a>
                        </div>
                    </div>
                )
            }
            case 'error': {
                return (
                    <div>
                        <p style={{color:'#f50'}}>文件上传出错</p>
                        <a href="#" onClick={() => {this.handleUpload()}} style={{marginRight:5}}>重新上传</a>
                        <a href="#" onClick={(e) => { this.handleCancelUpload(e)}}>取消</a>
                    </div>
                )
            }
        }
    }

    render() {
        return (<div>{this.generateComponent()}</div>)
    }
}

export default UploadState;
