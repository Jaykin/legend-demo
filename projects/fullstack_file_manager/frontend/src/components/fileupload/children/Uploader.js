import React, { Component } from 'react';
import WebUploader from 'webuploader';
import $ from 'jquery';

import { exts, mimes } from '../../_utils/config';
import callAPI from '../../_utils/api';
import { SUCCESS } from '../../_utils/errcode';

import {
    addFiles,
    fielInfoChange,
    changeUploadState
} from '../actions';

import 'webuploader/dist/webuploader.css';

// 缓存文件
let FILEDATA = {};      // 文件信息集合（以文件ID为key）
// 上传对象
let uploader = null;
// 上传文件数
let uploadQueueNum = 0;


// 注册上传钩子
WebUploader.Uploader.register({
    'before-send-file': function (file) {
        const deferred = WebUploader.Deferred();
        const owner = this.owner;
        let fileData = FILEDATA[file.id];

        // let duplicate = fileData.duplicate;

        if (file.size <= owner.options.chunkSize) {
            fileData.fragment = false;
        } else {
            fileData.fragment = true;
        }

        owner
            .md5File(file)
            .fail(() => {
                deferred.reject();
            })
            .then((md5) => {
                // let formData = owner.options.formData;
                let data = {
                    name: fileData.name,
                    ext: file.ext,
                    md5: md5,
                    size: file.size,
                    duplicate_id: fileData.duplicate_id,
                    file_name: fileData.name,
                    sequence: fileData.sequence,
                    description: fileData.description,
                    brand_id: fileData.brand_id || 0,
                    series_id: fileData.series_id || 0,
                    model_id: fileData.model_id || 0,
                    section_id: fileData.section_id || 0,
                    type_ids: fileData.type_ids,
                    is_open: fileData.is_open,
                    is_recommend: fileData.is_recommend
                }

                if (!fileData.duplicate_id) {
                    delete data.duplicate_id;
                }
                fileData.md5 = md5;
                callAPI.chunk_open({
                    type: 'post',
                    dataType: 'json',
                    data: data
                }).done(res => {
                    if (res.errcode == 3006 || res.errcode == 3003) {
                        // 同md5的文件已经上传，后台创建新纪录即可
                        fileData.duplicate = true;
                        res.fileId = file.id;
                        // uploader.skipFile(file);
                        deferred.reject();
                    } else if (res.errcode == 3004) {
                        // 文件被标记删除，直接上传即可
                        fileData.id = res.id;        // after-send-file需要用到
                        fileData.chunksMd5Data = [];
                        fileData.deleted = true;      // 文件再后台被标记删除
                        deferred.resolve();
                    } else if (res.errcode == 3007) {
                        // 某md5的文件正在上传，需要等到其上传完成或取消后再上传
                        fileData.isMd5Uploading = true;
                        deferred.reject();
                    } else {
                        // formData.file_id = res.id;
                        fileData.id = res.data.id;        // after-send-file需要用到
                        fileData.chunksMd5Data = [];
                        res.data.chunks.forEach((item) => {
                            fileData.chunksMd5Data[item.idx] = item.md5;
                        });
                        deferred.resolve();
                    }
                }).fail(err => {
                    deferred.reject();
                    console.dir(err);
                });
            });
        return deferred.promise();
    },
    'before-send': function (block) {
        // 这里全部执行完后才会上传分片
        const owner = this.owner;
        const deferred = WebUploader.Deferred();
        const blob = block.blob;
        let fileData = FILEDATA[block.file.id];
        let chunksMd5Data = fileData.chunksMd5Data;
        let fragment = fileData.fragment;
        owner.md5File(blob)
            // 如果读取出错了，则通过reject告诉webuploader文件上传出错。
            .fail(() => {
                deferred.reject();
            })
            .then((md5) => {
                // 分片验证
                let formData = owner.options.formData;
                let chunk;
                if (!fragment) {
                    chunk = 0;
                    formData.chunk = chunk;
                } else {
                    chunk = block.chunk;
                }

                if (fileData.deleted) {
                    chunksMd5Data[chunk] = md5;
                    deferred.reject();
                } else {
                    if (chunksMd5Data.indexOf(md5) < 0) {
                        // 该分片未上传过
                        chunksMd5Data[chunk] = md5;
                        deferred.resolve();
                    } else {
                        // 该分片已上传过
                        deferred.reject();
                    }
                }
            });
        return deferred.promise();
    },
    'after-send-file':function (file) {
        const deferred = WebUploader.Deferred();

        let fileData = FILEDATA[file.id];
        let data = {
            name: fileData.name,
            ext: file.ext,
            file_id: fileData.id,
            chunks: fileData.chunksMd5Data,
            file_name: fileData.name,
            sequence: fileData.sequence,
            description: fileData.description,
            brand_id: fileData.brand_id || 0,
            series_id: fileData.series_id || 0,
            model_id: fileData.model_id || 0,
            section_id: fileData.section_id || 0,
            type_ids: fileData.type_ids,
            is_open: fileData.is_open,
            is_recommend: fileData.is_recommend
        }

        callAPI.chunk_close({
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).done(res => {
            if (res.errcode != SUCCESS) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        }).fail(err => {
            console.dir(err);
            deferred.reject();
        });

        return deferred.promise();
    }
});

// 文件上传控制
class Uploader extends Component {
    componentDidMount() {
        this.initUploader();
    }

    // 初始化uploader
    initUploader() {
        const _this = this;
        const { dispatch } = _this.props;

        uploader = WebUploader.create({
            pick: '#addFile',
            accept: {
                title: 'fileType',
                extensions: exts.join(','),
                mimeTypes: mimes.join(',')
            },
            server: callAPI.uploadServer,
            auto: false,
            prepareNextFile:false,
            chunked: true,          // 是否要分片
            chunkSize: 5242880,     // 分多大一片(5M)
            chunkRetry: 1,          // 分片重传次数
            threads: 3,             // 上传并发数
            timeout: 0,             // 禁掉默认的2min超时设置
            fileVal: 'file'         // 文件上传域的name
        });

        // 文件加入队列
        uploader.on('filesQueued', files => {
            _this.addFiles(files);
        });

        // 每个文件分片上传前触发
        uploader.on('uploadBeforeSend', (obj, data, headers) => {
            let chunksMd5Data = FILEDATA[data.id].chunksMd5Data;

            data.md5 = chunksMd5Data[data.chunk];
            data.file_id = FILEDATA[data.id].id;
        });

        // 文件上传百分比
        uploader.on('uploadProgress', (file, percentage) => {
            dispatch(changeUploadState({ status: 'uploading', percent: percentage, fileId: file.id }));
        });

        // 每个文件分片上传后触发
        uploader.on('uploadAccept', (obj, ret, fn) => {
            /*
            * 注意：
            *   1、该事件监听用于当某个分片上传出错时控制是否重传该分片
            *   2、如果handler返回false，则会触发webuploader内部的server错误类型（会导致触发uploadError）
            *       从而会abort整个文件的上传（包括正在上传或未上传的分片）
            *   3、通过fn来传入错误类型给webuploader
                *      1、http/abort会触发重传分片
                *      2、server会触发文件上传出错
                *  4、当某分片上传由于md5校验出错则(参照源码4026行)
            * */
            if (ret.errcode != 0) {
                if (ret.errcode == 4000) {
                    fn();
                    return true;
                } else {
                    fn('abort')
                }
            }
        });

        // 文件上传成功
        uploader.on('uploadSuccess', (file, response) => {
            if (response && response.errcode != 0) {
                uploader.trigger('uploadError', file);
            } else {
                dispatch(changeUploadState({ status: 'done', percent: 1, fileId: file.id }));
                // 清除缓存数据
                FILEDATA[file.id] = null;
                uploadQueueNum--;
            }
        });

        // 文件上传失败
        uploader.on('uploadError', (file, reason) => {
            let fileData = FILEDATA[file.id];

            // 同md5的文件已经上传，后台创建新纪录即可
            if (fileData.duplicate) {
                uploader.trigger('uploadSuccess', file);
                return;
            }

            // 同md5的文件正在上传，需用户等待后再上传
            if (fileData.isMd5Uploading) {
                dispatch(changeUploadState({ status: 'isUploading', percent: 0, fileId: file.id }))
                return;
            }

            // 上传出错
            dispatch(changeUploadState({ status: 'error', percent: 0, fileId: file.id }));
        });
    }

    // 取消上传
    cancelFile(fileId) {
        const { dispatch } = this.props;

        uploader.cancelFile(fileId);
        dispatch(changeUploadState({ status: 'cancel', fileId }));
    }

    // 上传
    uploadFile(fileId, fileData) {
        const { dispatch } = this.props;

        FILEDATA[fileId] = fileData;
        uploader.upload(fileId);
        dispatch(changeUploadState({ status: 'uploading', percent: 0, fileId }));
    }

    // 添加上传的文件
    addFiles(files) {
        const _this = this;
        const { dispatch } = _this.props;
        let list = [];

        $.each(files, (idx, item) => {
            const ext = item.ext;
            const regName = new RegExp('\\.' + ext);
            let size = item.size / 1024;

            size = size < 1 ? '<1KB' : (size / 1024 < 1 ? (size << 0) + 'KB' : (size / 1024 << 0) + 'MB');

            list.push({
                file_id: item.id,
                file_name: item.name.replace(regName, ''),
                file_fromat: ext,
                file_size: size,
                file_is_open_bool: true,
                file_is_recommend_bool: true,
                file_sequence: 1,
                file_brief: '',
                file_section_id: '0',
                file_section_name: '其他',
                file_brand_id: undefined,
                file_brand_name: '',
                file_series_id: undefined,
                file_series_name: '',
                file_model_id: undefined,
                file_model_name: '',
                file_type_a_id: '0',
                file_type_a_name: '其他',
                file_type_b_id: undefined,
                file_type_b_name: '',
                file_type_c_id: undefined,
                file_type_c_name: '',
                // 文件信息更改
                handleChange: value => { dispatch(fielInfoChange(value)) },
                // 文件上传
                uploadFile: _this.uploadFile,
                // 取消上传
                cancelFile: _this.cancelFile,

                key: item.id,
                index: uploadQueueNum,
                uploadState: 'ready',
            });

            uploadQueueNum++;
        });

        dispatch(addFiles(list));
    }

    render() {
        return (
            <div id="addFile" className="webuploader-container">
                添加文件
            </div>
        )
    }
}

export default Uploader;

