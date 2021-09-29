import React, { Component } from 'react';
import { Select } from 'antd';

import callAPI from '../_utils/api';
import { SUCCESS } from '../_utils/errcode';
import generateHoc from './_genarateHoc';

import './sec-selector.css';

const Option = Select.Option;

/**
 * @props {
 *     getFieldDecorator: { function } - 用于和表单进行双向绑定
 *     sec: { object } - 表单传过来的初始值
 *     opts: {
 *         label: { string } - label名称
  *        id: { string } - 表单域的id
 *         selectorClassName: { string } - select的类名（可选 - 默认：ids-sec-selector）
 *         dropdownClassName: { string } - 下拉框的类名（可选 - 默认：ids-sec-dropdown）
 *     }
 * }
 * */

class SecSelector extends Component {
    constructor(props) {
        super(props);

        this.request = null;

        this.state = {
            secData: [props.sec.initData]
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sec.initData.section_id != this.props.sec.initData.section_id) {
            this.setState({ secData: [nextProps.sec.initData] });
        }
    }

    componentWillUnmount() {
        // 取消异步请求
        this.request && this.request.abort();
    }

    fetchSecData() {
        const cptInstace = this;
        const { allItem, otherItem } = cptInstace.props;
        let defaultItem = {};

        if (otherItem) {
            // 传入其他选项(无不限选项)
            defaultItem = [];
        } else {
            defaultItem = [{
                section_id: allItem.allItemId,
                section_name: allItem.allItemDes
            }];
        }

        this.request = callAPI.get_section_all();
        this.request.done(res => {
            if (res.errcode === SUCCESS) {
                let secData = [].concat(defaultItem);

                cptInstace.setState({
                    secData:secData.concat(res.data.list)
                });
            }
        })
    }

    secSelected(value, name) {
        const sectionName = value == allItemId ? '' : name;
        const { handleChange, fileId, allItemId, setExtraData } = this.props;
        let data = {
            section: value == allItemId ? '' : value
        };

        setExtraData && setExtraData('sectionName', sectionName);

        if (fileId) {
            data.sectionName = sectionName;
            data.fileId = fileId;
            data.key = 'section';
        }

        handleChange && handleChange(data);
    }

    render() {
        const { getFieldDecorator, sec, opts } = this.props;
        let { secData } = this.state;
        const props = {
            size: "small",
            className: opts.selectorClassName || "ids-sec-selector",
            onFocus: this.fetchSecData.bind(this),
            onSelect: (value, option) => { this.secSelected(value, option.props.name) },
            dropdownMatchSelectWidth: false,
            dropdownClassName: opts.dropdownClassName || "ids-sec-dropdown"
        }

        return generateHoc({
            label: opts.label,
            isFormItem: opts.isFormItem,
            fieldName: opts.id,
            initVal: sec.initData.section_id + '',
            getFieldDecorator,
            children: secData.map((item) => {
                let secId = item.section_id;

                return (
                    <Option
                        value={secId + ''}
                        key={secId}
                        name={item.section_name}
                    >
                        {item.section_name}
                    </Option>
                )
            })
        }, props)(Select);
    }
}

export default SecSelector;


/**
 * secData 结构
 *  secData:[
 *      {
            section_id:0,
            section_name:'不限'
        }
 ]
 *
 * */
