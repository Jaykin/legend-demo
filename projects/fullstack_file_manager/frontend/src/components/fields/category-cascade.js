
import React, { Component } from 'react';
import { Select } from 'antd';

import callAPI from '../_utils/api';
import { SUCCESS } from '../_utils/errcode';
import generateHoc from './_genarateHoc';

import './category-cascade.css';

const Option = Select.Option;

/**
 * @props {
 *      getFieldDecorator：{ function } - 用于生成FormItem
 *      setFieldsValue： { function } - 设置表单组件的value
 *      type: { object } - 组件的初始数据
 *      allItem: { object } - 组件中不限选项的数据
 *      otherItem: { object } - 组件中其他选项的数据（根据这个来区分操作）
 *      opts: {             - 样式 或 其他设置
 *          label: { string } -
 *          id: { string } - 表单域的key
 *              // 以下均为可选（有默认值），用来调整组件样式
 *          wrapClassName: { string }
 *          typeAClassName: { string }
 *          typeADropdownClassName: { string }
 *          typeBClassName: { string }
 *          typeBDropdownClassName: { string }
 *          typeCClassName: { string }
 *          typeCDropdownClassName: { string }
 *      }
 * }
 *
 * */

class CategoryCascade extends Component {
    constructor(props) {
        super(props);

        const { allItemId, allItemDes } = props.allItem;
        const { otherItem } = props;
        const defaultAll = [{ id: allItemId, name: allItemDes }];
        let typeAData = null;

        // 限制typeA 有其他选项，typeB typeC没有
        if (otherItem) {
            typeAData = [];
        } else {
            typeAData = defaultAll;
        }
        // allItem选项
        this.allTypeA = typeAData;
        this.allTypeB = defaultAll;
        this.allTypeC = defaultAll;
        // 标示全部的选项
        this.allItemId = allItemId;
        // 标示其他的选项
        this.otherItemId = otherItem ? otherItem.otherItemId : allItemId;
        // 组件的异步请求列表
        this.requests = [];

        this.state = this.getInitState();
    }

    componentWillUnmount() {
        // clean up pending request
        this.requests.forEach(req => req.abort());
    }

    componentWillReceiveProps(nextProps) {
        const nextData = nextProps.type.initData;
        const curData = this.props.type.initData;

        if (
            nextData.typeAValue != curData.typeAValue ||
            nextData.typeBValue != curData.typeBValue ||
            nextData.typeCValue !== curData.typeCValue
        ) { this.setState(this.getInitState(nextProps)) }
    }

    getInitState(props) {
        const _props = props || this.props;
        const { initData, initStatu, data } = _props.type

        return {
            // 初始数据
            ...initData,
            ...initStatu,
            // 列表数据
            typeAData: this.allTypeA.concat(data.typeA),
            typeBData: this.allTypeB.concat(data.typeB),
            typeCData: this.allTypeC.concat(data.typeC)
        }
    }

    resetField() {
        // 撤销级联选择结果，重置为组件初始化时的props数据
        this.setState(this.getInitState());
    }

    fetchTypeAData() {
        let typeAData = null;
        let request = callAPI.get_type_all();

        this.requests.push(request);

        request.done(res => {
            if (res.errcode === SUCCESS) {
                typeAData = this.allTypeA.concat(res.data);

                this.setState({ typeAData });
            }
        });
    }

    typeASelected(value, name) {
        const allItemId = this.allItemId;
        const otherItemId = this.otherItemId;
        const typeAName = value == allItemId ? '' : name;
        const { setFieldsValue, handleChange, fileId, setExtraData } = this.props;
        const valObj = {
            typeA: value,
            typeB: allItemId,
            typeC: allItemId
        }

        this.setState({
            typeAValue: value,
            typeBValue: allItemId,
            typeCValue: allItemId,
            typeASelected: (value === allItemId || value === otherItemId) ? false : true,
            typeBSelected: false,
            typeBData: this.allTypeB                  // 这里为了避免接口响应慢，导致typeB不能及时更新视图
        });

        if(setFieldsValue) {
            setFieldsValue(valObj);
            setExtraData && setExtraData('typeAName', typeAName);
        } else {
            valObj.typeAName = typeAName;
            valObj.fileId = fileId;
            valObj.key = 'typeA';
            handleChange && handleChange(valObj);
        }
    }

    fetchTypeBData() {
        let typeBData = null;
        const { typeAValue } = this.state;
        let request = callAPI.get_type_children({
            data:{ id: typeAValue },
        });

        this.requests.push(request);

        request.done(res => {
            if (res.errcode === SUCCESS) {
                typeBData = this.allTypeB.concat(res.data);

                this.setState({ typeBData });
            }
        });
    }

    typeBSelected(value, name) {
        const allItemId = this.allItemId;
        const typeBName = value == allItemId ? '' : name;
        const { setFieldsValue, handleChange, fileId, setExtraData } = this.props;
        const valObj = {
            typeB: value,
            typeC: allItemId
        }

        this.setState({
            typeBValue: value,
            typeCValue: allItemId,
            typeBSelected: value === allItemId ? false : true,
            typeCData: this.allTypeC                  // 这里为了避免接口响应慢，导致typeC不能及时更新视图
        });

        if (setFieldsValue) {
            setFieldsValue(valObj);
            setExtraData && setExtraData('typeBName', typeBName);
        } else {
            valObj.typeBName = typeBName;
            valObj.fileId = fileId;
            valObj.key = 'typeB';
            handleChange && handleChange(valObj);
        }
    }

    fetchTypeCData() {
        let typeCData = null;
        const { typeBValue } = this.state;
        let request = callAPI.get_type_children({
            data:{ id: typeBValue },
        });

        this.requests.push(request);

        request.done(res => {
            if (res.errcode === SUCCESS) {
                typeCData = this.allTypeC.concat(res.data);

                this.setState({ typeCData });
            }
        });
    }

    typeCSelected(value, name) {
        const typeCName = value == allItemId ? '' : name;
        const { handleChange, fileId, allItemId, setExtraData } = this.props;
        let valObj = { typeC: value };

        this.setState({ typeCValue: value });

        setExtraData && setExtraData('typeCName', typeCName);

        if (fileId) {
            valObj.typeCName = typeCName;
            valObj.fileId = fileId;
            valObj.key = 'typeC';
        }

        handleChange && handleChange(valObj);
    }

    render() {
        const { typeAValue, typeBValue, typeCValue, typeASelected, typeBSelected } = this.state;
        const { typeAData, typeBData, typeCData } = this.state;
        const { getFieldDecorator, opts  } = this.props;
        const filedsName = opts.id ? opts.id.split('_') : [];

        const typeAProps = {
            size: "small",
            className: opts.typeAClassName || 'ids-category-cascade-selector',
            onSelect: (value, option) => {this.typeASelected(value, option.props.name)},
            onFocus: this.fetchTypeAData.bind(this),
            dropdownMatchSelectWidth: false,
            dropdownClassName: opts.typeADropdownClassName || 'ids-typeA-dropdown'
        }

        const typeBProps = {
            size: "small",
            className: opts.typeBClassName || 'ids-category-cascade-selector',
            disabled: !typeASelected,
            onSelect: (value, option) => {this.typeBSelected(value, option.props.name)},
            onFocus: this.fetchTypeBData.bind(this),
            dropdownMatchSelectWidth: false,
            dropdownClassName: opts.typeBDropdownClassName || 'ids-typeB-dropdown'
        }

        const typeCProps = {
            size: "small",
            className: opts.typeCClassName || 'ids-category-cascade-selector',
            disabled: !typeBSelected,
            onSelect: (value, option) => {this.typeCSelected(value, option.props.name)},
            onFocus: this.fetchTypeCData.bind(this),
            dropdownMatchSelectWidth: false,
            dropdownClassName: opts.typeBDropdownClassName || 'ids-typeB-dropdown'
        }

        // 不是FormItem则需要自己控制组件的value
        if (!opts.isFormItem) {
            typeAProps.value = typeAValue;
            typeBProps.value = typeBValue;
            typeCProps.value = typeCValue;
        }

        return (
            <div className={opts.wrapClassName || "ids-category-cascade-wrap"}>
                {
                    generateHoc({
                        label: opts.label,
                        isFormItem: opts.isFormItem,
                        fieldName: filedsName[0],
                        initVal: typeAValue,
                        getFieldDecorator,
                        children: typeAData.map(item => (
                            <Option value={item.id + ''} name={item.name} key={item.id + ''} >{item.name}</Option>
                        ))
                    }, typeAProps)(Select)
                }
                {
                    generateHoc({
                        isFormItem: opts.isFormItem,
                        fieldName: filedsName[1],
                        initVal: typeBValue,
                        getFieldDecorator,
                        children: typeBData.map(item => (
                            <Option value={item.id + ''} name={item.name} key={item.id + ''} >{item.name}</Option>
                        ))
                    }, typeBProps)(Select)
                }
                {
                    generateHoc({
                        isFormItem: opts.isFormItem,
                        fieldName: filedsName[2],
                        initVal: typeCValue,
                        getFieldDecorator,
                        children: typeCData.map(item => (
                            <Option value={item.id + ''} name={item.name} key={item.id + ''} >{item.name}</Option>
                        ))
                    }, typeCProps)(Select)
                }
            </div>
        )
    }
}


export default CategoryCascade


/* 数据结构：
 * 注意：id 即 value
 * @props.type {
 *       initData: {
 *            typeAValue: { string }
 *            typeBValue: { string }
 *            typeCValue: { string }
 *        },
 *        initStatu: {
 *            typeASelected: { boolean }
 *            typeBSelected: { boolean }
 *        }
 * }
 * **/

/**
 * @props.allItem {
 *      allItemId: { string } - 默认为 'all'
 *      allItemDes: { string } - 默认为 '不限'
 * }
 *
 * */
